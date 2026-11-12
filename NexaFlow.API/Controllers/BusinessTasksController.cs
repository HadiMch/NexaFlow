
using Microsoft.AspNetCore.Mvc;
using NexaFlow.API.DTOs.Tasks;
using NexaFlow.API.Services;

namespace NexaFlow.API.Controllers;

/// <summary>
/// Manages business tasks and task statistics.
/// </summary>
///
[ApiController]
[Route("api/[controller]")]
public class BusinessTasksController : ControllerBase{
    private readonly BusinessTaskService _service;
    private readonly BusinessTaskStatsService _statsService;

    public BusinessTasksController(BusinessTaskService service, BusinessTaskStatsService statsService){
        _service = service;
        _statsService = statsService;
    }

    /// <summary>
    /// Retrieves all business tasks.
    /// </summary>

    [HttpGet]
    [ProducesResponseType(typeof(List<BusinessTaskResponseDto>),StatusCodes.Status200OK)]
    public async Task<ActionResult<List<BusinessTaskResponseDto>>> GetAll(){
        var tasks = await _service.GetAllAsync();
        return Ok(tasks);
    }

    /// <summary>
    /// Retrieves task statistics.
    /// </summary>

    [HttpGet("stats")]
    [ProducesResponseType(typeof(BusinessTaskStatsDto),StatusCodes.Status200OK)]
    public async Task<ActionResult<BusinessTaskStatsDto>> GetStats(){
        var stats = await _statsService.GetStatsAsync();
        return Ok(stats);
    }

    /// <summary>
    /// Retrieves a business task by ID.
    /// </summary>

    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(BusinessTaskResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<BusinessTaskResponseDto>> GetById(int id){
        var task = await _service.GetByIdAsync(id);

        if (task == null)
            return NotFound();

        return Ok(task);
    }

    /// <summary>
    /// Creates a new business task.
    /// </summary>

    [HttpPost]
    [ProducesResponseType(typeof(BusinessTaskResponseDto),StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<BusinessTaskResponseDto>> Create([FromBody] CreateBusinessTaskDto dto){
        if (string.IsNullOrWhiteSpace(dto.Title))
            return BadRequest("Task title cannot be empty.");

        var task = await _service.CreateAsync(dto);

        return CreatedAtAction(
            nameof(GetById),
            new { id = task.Id },
            task
        );
    }

    /// <summary>
    /// Updates an existing business task.
    /// </summary>

    [HttpPut("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(int id,[FromBody] UpdateBusinessTaskDto dto){
        if (string.IsNullOrWhiteSpace(dto.Title))
            return BadRequest("Task title cannot be empty.");

        var updated = await _service.UpdateAsync(id, dto);

        if (!updated)
            return NotFound();

        return NoContent();
    }

    /// <summary>
    /// Deletes a business task by ID.
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
