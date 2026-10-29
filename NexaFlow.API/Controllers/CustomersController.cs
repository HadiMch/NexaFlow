
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NexaFlow.API.Data;
using NexaFlow.API.Models;
using NexaFlow.API.DTOs;


namespace NexaFlow.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomersController : ControllerBase{
    private readonly AppDbContext _context;

    public CustomersController(AppDbContext context){
        _context = context;
    }



[HttpGet("{id:int}")]
public async Task<ActionResult<Customer>> GetCustomerById(int id){
    var customer = await _context.Customers.AsNoTracking().FirstOrDefaultAsync(c => c.Id == id);

    if (customer == null)
        return NotFound();

    return Ok(customer);
}



[HttpGet]
public async Task<ActionResult<List<Customer>>> GetCustomers([FromQuery] int page = 1,[FromQuery] int pageSize = 10){
    if (page < 1 || pageSize < 1 || pageSize > 100)
        return BadRequest("Invalid pagination parameters.");

    return await _context.Customers.AsNoTracking().OrderBy(c => c.Id).Skip((page - 1) * pageSize)
        .Take(pageSize).ToListAsync();
}




[HttpGet("search")]
public async Task<ActionResult<List<Customer>>> SearchCustomers([FromQuery] string name){
    if (string.IsNullOrWhiteSpace(name))
        return BadRequest("Please enter a name.");

    return await _context.Customers.AsNoTracking().Where(c => EF.Functions.ILike(c.Name, $"%{name}%"))
        .ToListAsync();
}



[HttpGet("count")]
public async Task<ActionResult<int>> GetCustomerCount(){
    var count = await _context.Customers.CountAsync();
    return Ok(count);
}



[HttpPut("{id:int}")]
public async Task<IActionResult> UpdateCustomer(int id, [FromBody] UpdateCustomerDto dto){
    var customer = await _context.Customers.FindAsync(id);

    if (customer == null)
        return NotFound();

    customer.Name = dto.Name;
    customer.Email = dto.Email;
    customer.Phone = dto.Phone;

    await _context.SaveChangesAsync();

    return NoContent();
}




[HttpDelete("{id:int}")]
public async Task<IActionResult> DeleteCustomer(int id){
    var customer = await _context.Customers.FindAsync(id);

    if (customer == null)
        return NotFound();

    _context.Customers.Remove(customer);
    await _context.SaveChangesAsync();
    return NoContent();
}


    

[HttpPost]
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

    return CreatedAtAction(nameof(GetCustomerById), new { id = customer.Id }, customer);
}

}
