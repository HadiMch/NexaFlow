
using NexaFlow.API.DTOs;
using NexaFlow.API.Tests.Helpers;

namespace NexaFlow.API.Tests.Customers;

public class CreateCustomerDtoTests
{
    [Fact]
    public void ValidCustomer_ShouldPassValidation()
    {
        var dto = new CreateCustomerDto
        {
            Name = "John Smith",
            Email = "john@example.com",
            Phone = "70123456"
        };

        var errors = ValidationHelper.Validate(dto);

        Assert.Empty(errors);
    }

    [Fact]
    public void MissingName_ShouldFailValidation()
    {
        var dto = new CreateCustomerDto
        {
            Name = "",
            Email = "john@example.com"
        };

        var errors = ValidationHelper.Validate(dto);

        Assert.Contains(errors, error =>
            error.MemberNames.Contains(nameof(dto.Name)));
    }

    [Fact]
    public void MissingEmail_ShouldFailValidation()
    {
        var dto = new CreateCustomerDto
        {
            Name = "John Smith",
            Email = ""
        };

        var errors = ValidationHelper.Validate(dto);

        Assert.Contains(errors, error =>
            error.MemberNames.Contains(nameof(dto.Email)));
    }

    [Theory]
    [InlineData("invalid-email")]
    [InlineData("john@")]
    [InlineData("@example.com")]
    public void InvalidEmail_ShouldFailValidation(string email)
    {
        var dto = new CreateCustomerDto
        {
            Name = "John Smith",
            Email = email
        };

        var errors = ValidationHelper.Validate(dto);

        Assert.Contains(errors, error =>
            error.MemberNames.Contains(nameof(dto.Email)));
    }

    [Fact]
    public void NameLongerThan100Characters_ShouldFailValidation()
    {
        var dto = new CreateCustomerDto
        {
            Name = new string('A', 101),
            Email = "john@example.com"
        };

        var errors = ValidationHelper.Validate(dto);

        Assert.Contains(errors, error =>
            error.MemberNames.Contains(nameof(dto.Name)));
    }

    [Fact]
    public void EmailLongerThan255Characters_ShouldFailValidation()
    {
        var dto = new CreateCustomerDto
        {
            Name = "John Smith",
            Email = $"{new string('a', 250)}@example.com"
        };

        var errors = ValidationHelper.Validate(dto);

        Assert.Contains(errors, error =>
            error.MemberNames.Contains(nameof(dto.Email)));
    }

    [Fact]
    public void PhoneLongerThan30Characters_ShouldFailValidation()
    {
        var dto = new CreateCustomerDto
        {
            Name = "John Smith",
            Email = "john@example.com",
            Phone = new string('1', 31)
        };

        var errors = ValidationHelper.Validate(dto);

        Assert.Contains(errors, error =>
            error.MemberNames.Contains(nameof(dto.Phone)));
    }

    [Fact]
    public void EmptyPhone_ShouldPassValidation()
    {
        var dto = new CreateCustomerDto
        {
            Name = "John Smith",
            Email = "john@example.com",
            Phone = ""
        };

        var errors = ValidationHelper.Validate(dto);

        Assert.Empty(errors);
    }
}
