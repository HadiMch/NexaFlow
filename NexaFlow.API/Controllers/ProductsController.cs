
using Microsoft.AspNetCore.Mvc;
using NexaFlow.API.DTOs;
using NexaFlow.API.Models;
using NexaFlow.API.Services;

namespace NexaFlow.API.Controllers;

/// <summary>
/// Manages inventory products and inventory statistics.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly ProductService _productService;

    public ProductsController(ProductService productService)
    {
        _productService = productService;
    }

    /// <summary>
    /// Retrieves all inventory products.
    /// </summary>
    /// <returns>A list of products.</returns>
    [HttpGet]
    [ProducesResponseType(typeof(List<Product>), StatusCodes.Status200OK)]
    public async Task<ActionResult<List<Product>>> GetProducts()
    {
        return Ok(await _productService.GetAllAsync());
    }

    /// <summary>
    /// Retrieves an inventory product by ID.
    /// </summary>
    /// <param name="id">The product identifier.</param>
    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(Product), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Product>> GetProductById(int id)
    {
        var product = await _productService.GetByIdAsync(id);

        if (product == null)
            return NotFound();

        return Ok(product);
    }

    /// <summary>
    /// Creates a new inventory product.
    /// </summary>
    /// <param name="dto">The product information.</param>
    [HttpPost]
    [ProducesResponseType(typeof(Product), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Product>> CreateProduct(
        [FromBody] CreateProductDto dto)
    {
        var product = await _productService.CreateAsync(dto);

        return CreatedAtAction(
            nameof(GetProductById),
            new { id = product.Id },
            product
        );
    }

    /// <summary>
    /// Updates an existing inventory product.
    /// </summary>
    /// <param name="id">The product identifier.</param>
    /// <param name="dto">The updated product information.</param>
    [HttpPut("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateProduct(
        int id,
        [FromBody] UpdateProductDto dto)
    {
        var updated = await _productService.UpdateAsync(id, dto);

        if (!updated)
            return NotFound();

        return NoContent();
    }

    /// <summary>
    /// Deletes an inventory product by ID.
    /// </summary>
    /// <param name="id">The product identifier.</param>
    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        var deleted = await _productService.DeleteAsync(id);

        if (!deleted)
            return NotFound();

        return NoContent();
    }

    /// <summary>
    /// Retrieves inventory summary statistics.
    /// </summary>
    [HttpGet("stats")]
    [ProducesResponseType(typeof(InventoryStatsDto), StatusCodes.Status200OK)]
    public async Task<ActionResult<InventoryStatsDto>> GetInventoryStats()
    {
        var stats = await _productService.GetInventoryStatsAsync();

        return Ok(stats);
    }
}
