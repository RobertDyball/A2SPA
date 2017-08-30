using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace A2SPA.Helpers
{
    public static class DataAnnotationsValidator
    {
        // created extension method based on ideas from K. Scott Allen, lifted from:
        // http://odetocode.com/Blogs/scott/archive/2011/06/29/manual-validation-with-data-annotations.aspx
        public static bool IsModelValid(this object @object, out ICollection<ValidationResult> results)
        {
            var context = new ValidationContext(@object, serviceProvider: null, items: null);
            results = new List<ValidationResult>();
            return Validator.TryValidateObject(
                @object, context, results,
                validateAllProperties: true
            );
        }
    }
}
