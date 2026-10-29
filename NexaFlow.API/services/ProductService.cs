
using Microsoft.EntityFrameworkCore;
using NexaFlow.API.Data;
using NexaFlow.API.DTOs;
using NexaFlow.API.Models;

namespace NexaFlow.API.Services;

public class ProductService{
    
    private readonly AppDbContext _context;

    public ProductService(AppDbContext context){
        _context = context;
    }

    public async Task<List<Product>> GetAllAsync(){
        return await _context.Products.AsNoTracking().OrderBy(p => p.Id).ToListAsync();
    }

    public async Task<Product?> GetByIdAsync(int id){
        return await _context.Products.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<Product> CreateAsync(CreateProductDto dto){
        var product = new Product
        {
            Name = dto.Name,
            SKU = dto.SKU,
            Quantity = dto.Quantity,
            Price = dto.Price,
            CreatedAt = DateTime.UtcNow
        };

        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        return product;
    }

    public async Task<bool> UpdateAsync(int id, UpdateProductDto dto){
        var product = await _context.Products.FindAsync(id);

        if (product == null)
            return false;

        product.Name = dto.Name;
        product.SKU = dto.SKU;
        product.Quantity = dto.Quantity;
        product.Price = dto.Price;

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id){
        var product = await _context.Products.FindAsync(id);

        if (product == null)
            return false;

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();

        return true;
    }

    
    public async Task<InventoryStatsDto> GetInventoryStatsAsync(){
        var products = _context.Products.AsNoTracking();

        return new InventoryStatsDto
        {
            TotalProducts = await products.CountAsync(),

            TotalStockQuantity = await products.SumAsync(p => (long)p.Quantity),
            LowStockProducts = await products.CountAsync(p => p.Quantity <= 5),

            TotalInventoryValue = await products.SumAsync(p => p.Price * p.Quantity)
        };
    }

}
