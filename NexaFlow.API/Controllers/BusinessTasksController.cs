
using Microsoft.AspNetCore.Mvc;
using NexaFlow.API.DTOs.Tasks;
using NexaFlow.API.Services;

namespace NexaFlow.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BusinessTasksController : ControllerBase
{
    private readonly BusinessTaskService _service;
    private readonly BusinessTaskStatsService _statsService;

    public BusinessTasksController(
        BusinessTaskService service,
        BusinessTaskStatsService statsService)
    {
        _service = service;
        _statsService = statsService;
    }

    // GET: api/BusinessTasks
    [HttpGet]
    public async Task<ActionResult<List<BusinessTaskResponseDto>>> GetAll()
    {
        var tasks = await _service.GetAllAsync();
        return Ok(tasks);
    }

    // GET: api/BusinessTasks/stats
    [HttpGet("stats")]
    public async Task<ActionResult<BusinessTaskStatsDto>> GetStats()
    {
        var stats = await _statsService.GetStatsAsync();
        return Ok(stats);
    }

    // GET: api/BusinessTasks/1
    [HttpGet("{id:int}")]
    public async Task<ActionResult<BusinessTaskResponseDto>> GetById(int id)
    {
        var task = await _service.GetByIdAsync(id);

        if (task == null)
            return NotFound();

        return Ok(task);
    }

    // POST: api/BusinessTasks
    [HttpPost]
    public async Task<ActionResult<BusinessTaskResponseDto>> Create(
        CreateBusinessTaskDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Title))
            return BadRequest("Task title cannot be empty.");

        var task = await _service.CreateAsync(dto);

        return CreatedAtAction(
            nameof(GetById),
            new { id = task.Id },
            task
        );
    }

    // PUT: api/BusinessTasks/1
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(
        int id,
        UpdateBusinessTaskDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Title))
            return BadRequest("Task title cannot be empty.");

        var updated = await _service.UpdateAsync(id, dto);

        if (!updated)
            return NotFound();

        return NoContent();
    }

    // DELETE: api/BusinessTasks/1
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _service.DeleteAsync(id);

        if (!deleted)
            return NotFound();

        return NoContent();
    }
}
