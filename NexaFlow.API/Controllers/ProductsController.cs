
using Microsoft.AspNetCore.Mvc;
using NexaFlow.API.DTOs;
using NexaFlow.API.Models;
using NexaFlow.API.Services;

namespace NexaFlow.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase{
    private readonly ProductService _productService;

    public ProductsController(ProductService productService){
        _productService = productService;
    }


    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetProducts(){
        return Ok(await _productService.GetAllAsync());
    }


    [HttpGet("{id:int}")]
    public async Task<ActionResult<Product>> GetProductById(int id){
        var product = await _productService.GetByIdAsync(id);

        if (product == null)
            return NotFound();

        return Ok(product);
    }
    [HttpPost]
    public async Task<ActionResult<Product>> CreateProduct([FromBody] CreateProductDto dto){
        var product = await _productService.CreateAsync(dto);

        return CreatedAtAction(
            nameof(GetProductById),
            new { id = product.Id },
            product
        );
    }


    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateProduct(int id, [FromBody] UpdateProductDto dto){
        var updated = await _productService.UpdateAsync(id, dto);

        if (!updated)
            return NotFound();

        return NoContent();
    }


    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteProduct(int id){
        var deleted = await _productService.DeleteAsync(id);

        if (!deleted)
            return NotFound();

        return NoContent();
    }
}