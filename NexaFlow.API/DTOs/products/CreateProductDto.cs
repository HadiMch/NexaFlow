
using System.ComponentModel.DataAnnotations;

namespace NexaFlow.API.DTOs;

public class CreateProductDto{
    [Required]
    [MaxLength(150)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [MaxLength(50)]
    public string SKU { get; set; } = string.Empty;

    [Range(0, int.MaxValue)]
    public int Quantity { get; set; }

    [Range(typeof(decimal), "0", "999999999")]
    public decimal Price { get; set; }
}
