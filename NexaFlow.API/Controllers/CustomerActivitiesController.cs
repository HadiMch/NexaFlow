
using Microsoft.AspNetCore.Mvc;
using NexaFlow.API.DTOs;
using NexaFlow.API.Services;

namespace NexaFlow.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomerActivitiesController : ControllerBase{
    private readonly CustomerActivityService _service;

    public CustomerActivitiesController(CustomerActivityService service){
        _service = service;
    }


    // GET: api/CustomerActivities/customer/1
    [HttpGet("customer/{customerId:int}")]
    public async Task<ActionResult<List<CustomerActivityResponseDto>>> GetByCustomer(
        int customerId){
        var activities = await _service.GetAllAsync(customerId);
        return Ok(activities);
    }


    // GET: api/CustomerActivities/1
    [HttpGet("{id:int}")]
    public async Task<ActionResult<CustomerActivityResponseDto>> GetById(int id)
    {
        var activity = await _service.GetByIdAsync(id);

        if (activity == null)
            return NotFound();

        return Ok(activity);
    }

    // POST: api/CustomerActivities
    [HttpPost]
    public async Task<ActionResult<CustomerActivityResponseDto>> Create(
        CreateCustomerActivityDto dto){
        var activity = await _service.CreateAsync(dto);

        if (activity == null)
            return BadRequest("Customer does not exist.");

        return CreatedAtAction(
            nameof(GetById),
            new { id = activity.Id },
            activity
        );
    }


    // PUT: api/CustomerActivities/1
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id,UpdateCustomerActivityDto dto){
        var updated = await _service.UpdateAsync(id, dto);

        if (!updated)
            return NotFound();

        return NoContent();
    }


    // DELETE: api/CustomerActivities/1
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id){
        var deleted = await _service.DeleteAsync(id);

        if (!deleted)
            return NotFound();

        return NoContent();
    }
}
