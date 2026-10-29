
using System.ComponentModel.DataAnnotations;

namespace NexaFlow.API.DTOs;

public class UpdateCustomerDto
{
    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [MaxLength(255)]
    public string Email { get; set; } = string.Empty;

    [MaxLength(30)]
    public string Phone { get; set; } = string.Empty;
}
