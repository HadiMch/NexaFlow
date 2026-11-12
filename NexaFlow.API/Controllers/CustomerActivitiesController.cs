
using Microsoft.AspNetCore.Mvc;
using NexaFlow.API.DTOs;
using NexaFlow.API.Services;

namespace NexaFlow.API.Controllers;

/// <summary>
/// Manages customer CRM activities and follow-up records.
/// </summary>

[ApiController]
[Route("api/[controller]")]
public class CustomerActivitiesController : ControllerBase{
    private readonly CustomerActivityService _service;

    public CustomerActivitiesController(CustomerActivityService service){
        _service = service;
    }

    /// <summary>
    /// Retrieves all activities belonging to a customer.
    /// </summary>

    [HttpGet("customer/{customerId:int}")]
    [ProducesResponseType(typeof(List<CustomerActivityResponseDto>),StatusCodes.Status200OK)]
    public async Task<ActionResult<List<CustomerActivityResponseDto>>> GetByCustomer(int customerId){
        var activities = await _service.GetAllAsync(customerId);
        return Ok(activities);
    }

    /// <summary>
    /// Retrieves a customer activity by ID.
    /// </summary>

    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(CustomerActivityResponseDto),StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<CustomerActivityResponseDto>> GetById(int id){
        var activity = await _service.GetByIdAsync(id);
        if (activity == null)
            return NotFound();

        return Ok(activity);
    }

    /// <summary>
    /// Creates a new customer activity.
    /// </summary>

    [HttpPost]
    [ProducesResponseType(typeof(CustomerActivityResponseDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<CustomerActivityResponseDto>> Create([FromBody] CreateCustomerActivityDto dto){
        var activity = await _service.CreateAsync(dto);

        if (activity == null)
            return BadRequest("Customer does not exist.");

        return CreatedAtAction(
            nameof(GetById),
            new { id = activity.Id },
            activity
        );
    }

    /// <summary>
    /// Updates an existing customer activity.
    /// </summary>

    [HttpPut("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(int id,[FromBody] UpdateCustomerActivityDto dto){
        var updated = await _service.UpdateAsync(id, dto);

        if (!updated)
            return NotFound();

        return NoContent();
    }

    /// <summary>
    /// Deletes an existing customer activity.
    /// </summary>

    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(int id){
        var deleted = await _service.DeleteAsync(id);

        if (!deleted)
            return NotFound();

        return NoContent();
    }
}