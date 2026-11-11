
using NexaFlow.API.DTOs;
using NexaFlow.API.Tests.Helpers;

namespace NexaFlow.API.Tests.Customers;

public class UpdateCustomerDtoTests
{
    [Fact]
    public void ValidCustomer_ShouldPass()
    {
        var dto = new UpdateCustomerDto
        {
            Name = "John Smith",
            Email = "john@example.com",
            Phone = "70123456"
        };

        Assert.Empty(ValidationHelper.Validate(dto));
    }

    [Theory]
    [InlineData("invalid-email")]
    [InlineData("john@")]
    [InlineData("@example.com")]
    public void InvalidEmail_ShouldFail(string email)
    {
        var dto = new UpdateCustomerDto
        {
            Name = "John Smith",
            Email = email
        };

        var errors = ValidationHelper.Validate(dto);

        Assert.Contains(errors, error =>
            error.MemberNames.Contains(nameof(dto.Email)));
    }

    [Fact]
    public void MissingEmail_ShouldFail()
    {
        var dto = new UpdateCustomerDto
        {
            Name = "John Smith",
            Email = ""
        };

        var errors = ValidationHelper.Validate(dto);

        Assert.Contains(errors, error =>
            error.MemberNames.Contains(nameof(dto.Email)));
    }

    [Fact]
    public void NameLongerThan100Characters_ShouldFail()
    {
        var dto = new UpdateCustomerDto
        {
            Name = new string('A', 101),
            Email = "john@example.com"
        };

        var errors = ValidationHelper.Validate(dto);

        Assert.Contains(errors, error =>
            error.MemberNames.Contains(nameof(dto.Name)));
    }

    [Fact]
    public void PhoneLongerThan30Characters_ShouldFail()
    {
        var dto = new UpdateCustomerDto
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
    public void MissingName_ShouldFailValidation()
    {
        var dto = new UpdateCustomerDto
        {
            Name = "",
            Email = "john@example.com"
        };

        var errors = ValidationHelper.Validate(dto);

        Assert.Contains(errors, error =>
            error.MemberNames.Contains(nameof(dto.Name)));
    }
}