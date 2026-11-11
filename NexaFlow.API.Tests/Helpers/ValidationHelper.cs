
using System.ComponentModel.DataAnnotations;

namespace NexaFlow.API.Tests.Helpers;

public static class ValidationHelper
{
    public static List<ValidationResult> Validate(object model)
    {
        var results = new List<ValidationResult>();

        var context = new ValidationContext(model);

        Validator.TryValidateObject(
            model,
            context,
            results,
            validateAllProperties: true
        );

        return results;
    }
}
