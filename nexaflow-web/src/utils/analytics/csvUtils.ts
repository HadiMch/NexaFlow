export type CsvValue = string | number;

function isFormulaLikeText(value: string): boolean {
  const trimmed = value.trimStart();

  if (!trimmed) return false;

  const firstChar = trimmed.charCodeAt(0);

  return (
    trimmed.startsWith("=") ||
    trimmed.startsWith("+") ||
    trimmed.startsWith("-") ||
    trimmed.startsWith("@") ||
    firstChar < 32 ||
    firstChar === 127
  );
}

function escapeCsvValue(value: CsvValue): string {
  if (typeof value === "number") {
    return Number.isFinite(value) ? String(value) : '""';
  }

  const safeText = isFormulaLikeText(value) ? `'${value}` : value;

  return `"${safeText.replace(/"/g, '""')}"`;
}

export function createCsv(rows: CsvValue[][]): string {
  return rows.map((row) => row.map(escapeCsvValue).join(",")).join("\r\n");
}

export function downloadCsv(rows: CsvValue[][], filename: string): void {
  const content = createCsv(rows);

  const blob = new Blob(["\uFEFF", content], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;

  try {
    document.body.appendChild(link);
    link.click();
  } finally {
    link.remove();

    window.setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  }
}

export function getUtcDateStamp(): string {
  return new Date().toISOString().slice(0, 10);
}
