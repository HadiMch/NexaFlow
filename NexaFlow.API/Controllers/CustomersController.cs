
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NexaFlow.API.Data;
using NexaFlow.API.DTOs;
using NexaFlow.API.Models;

namespace NexaFlow.API.Controllers;

/// <summary>
/// Manages customers, customer searches, and pagination.
/// </summary>
/// 
[ApiController]
[Route("api/[controller]")]
public class CustomersController : ControllerBase{
    private readonly AppDbContext _context;
    public CustomersController(AppDbContext context){
        _context = context;
    }

    /// <summary>
    /// Retrieves a customer by ID.
    /// </summary>

    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(Customer), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Customer>> GetCustomerById(int id){
        var customer = await _context.Customers.AsNoTracking().FirstOrDefaultAsync(c => c.Id == id);

        if (customer == null)
            return NotFound();

        return Ok(customer);
    }

    /// <summary>
    /// Retrieves a paginated list of customers.
    /// </summary>

    [HttpGet]
    [ProducesResponseType(typeof(PagedResultDto<Customer>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<PagedResultDto<Customer>>> GetCustomers(
        [FromQuery] string? search = null,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
    {
        if (page < 1 || pageSize < 1 || pageSize > 100)
            return BadRequest("Invalid pagination parameters.");

        var query = _context.Customers.AsNoTracking();

        if (!string.IsNullOrWhiteSpace(search)){
            var term = search.Trim();
            query = query.Where(c => EF.Functions.ILike(c.Name, $"%{term}%"));
        }

        var totalCount = await query.CountAsync();
        var customers = await query.OrderBy(c => c.Id).Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();

        return Ok(new PagedResultDto<Customer>{
            Items = customers,
            TotalCount = totalCount,
            Page = page,
            PageSize = pageSize
        });
    }

    /// <summary>
    /// Searches customers by name.
    /// </summary>

    [HttpGet("search")]
    [ProducesResponseType(typeof(List<Customer>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<List<Customer>>> SearchCustomers([FromQuery] string name){
        if (string.IsNullOrWhiteSpace(name))
            return BadRequest("Please enter a name.");

        return await _context.Customers.AsNoTracking().Where(c => EF.Functions.ILike(c.Name, $"%{name}%")).ToListAsync();
    }

    /// <summary>
    /// Retrieves the total number of customers.
    /// </summary>
    [HttpGet("count")]
    [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
    public async Task<ActionResult<int>> GetCustomerCount(){
        var count = await _context.Customers.CountAsync();
        return Ok(count);
    }

    /// <summary>
    /// Updates an existing customer.
    /// </summary>

    [HttpPut("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateCustomer(int id,[FromBody] UpdateCustomerDto dto){
        var customer = await _context.Customers.FindAsync(id);

        if (customer == null)
            return NotFound();

        customer.Name = dto.Name;
        customer.Email = dto.Email;
        customer.Phone = dto.Phone;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    /// <summary>
    /// Deletes a customer by ID.
    /// </summary>

    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteCustomer(int id){
        var customer = await _context.Customers.FindAsync(id);

        if (customer == null)
            return NotFound();

        _context.Customers.Remove(customer);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    /// <summary>
    /// Creates a new customer.
    /// </summary>

    [HttpPost]
    [ProducesResponseType(typeof(Customer), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Customer>> CreateCustomer([FromBody] CreateCustomerDto dto){
        var customer = new Customer
        {
            Name = dto.Name,
            Email = dto.Email,
            Phone = dto.Phone,
            CreatedAt = DateTime.UtcNow
        };

        _context.Customers.Add(customer);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetCustomerById),
            new { id = customer.Id },
            customer
        );
    }
}