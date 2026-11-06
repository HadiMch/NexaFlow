import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { Product, ProductInput } from "../../types/product";

interface UseProductFormProps {
  editingProduct: Product | null;
  saving: boolean;
  onSubmit: (data: ProductInput) => Promise<boolean>;
  onDirtyChange?: (dirty: boolean) => void;
}

type ProductField = "name" | "sku" | "quantity" | "price";

type ProductErrors = Partial<Record<ProductField, string>>;

export function useProductForm({
  editingProduct,
  saving,
  onSubmit,
  onDirtyChange,
}: UseProductFormProps) {
  const initialName = editingProduct?.name ?? "";
  const initialSku = editingProduct?.sku ?? "";
  const initialQuantity = editingProduct?.quantity.toString() ?? "0";
  const initialPrice = editingProduct?.price.toString() ?? "0";

  const [name, setName] = useState(initialName);
  const [sku, setSku] = useState(initialSku);
  const [quantity, setQuantity] = useState(initialQuantity);
  const [price, setPrice] = useState(initialPrice);

  const [errors, setErrors] = useState<ProductErrors>({});
  const [error, setError] = useState("");

  const dirty =
    name !== initialName ||
    sku !== initialSku ||
    quantity !== initialQuantity ||
    price !== initialPrice;

  useEffect(() => {
    onDirtyChange?.(dirty);
  }, [dirty, onDirtyChange]);

  function changeField(field: ProductField, value: string) {
    switch (field) {
      case "name":
        setName(value);
        break;
      case "sku":
        setSku(value);
        break;
      case "quantity":
        setQuantity(value);
        break;
      case "price":
        setPrice(value);
        break;
    }

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));

    setError("");
  }

  function validate(): ProductInput | null {
    const nextErrors: ProductErrors = {};

    const trimmedName = name.trim();
    const trimmedSku = sku.trim();

    const parsedQuantity = Number(quantity);
    const parsedPrice = Number(price);

    if (!trimmedName) {
      nextErrors.name = "Product name is required.";
    } else if (trimmedName.length > 150) {
      nextErrors.name = "Maximum 150 characters.";
    }

    if (!trimmedSku) {
      nextErrors.sku = "SKU is required.";
    } else if (trimmedSku.length > 50) {
      nextErrors.sku = "Maximum 50 characters.";
    }

    if (
      quantity.trim() === "" ||
      !Number.isSafeInteger(parsedQuantity) ||
      parsedQuantity < 0
    ) {
      nextErrors.quantity = "Enter a valid non-negative whole number.";
    }

    if (
      price.trim() === "" ||
      !Number.isFinite(parsedPrice) ||
      parsedPrice < 0 ||
      parsedPrice > 999999999
    ) {
      nextErrors.price = "Enter a price between 0 and 999,999,999.";
    } else if (!/^\d+(\.\d{1,2})?$/.test(price.trim())) {
      nextErrors.price = "Price must have no more than 2 decimal places.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return null;
    }

    return {
      name: trimmedName,
      sku: trimmedSku,
      quantity: parsedQuantity,
      price: parsedPrice,
    };
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (saving) return;

    setError("");

    const data = validate();
    if (!data) return;

    try {
      const success = await onSubmit(data);

      if (!success) {
        setError("Unable to save product. Please check the details.");
      }
    } catch {
      setError("Unable to save product. Please try again.");
    }
  }

  return {
    name,
    sku,
    quantity,
    price,
    errors,
    error,
    changeField,
    handleSubmit,
  };
}
