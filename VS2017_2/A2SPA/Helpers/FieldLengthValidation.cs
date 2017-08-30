using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.ModelBinding.Metadata;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace A2SPA.Helpers
{
    public static class FieldLengthValidation
    {
        /// <summary>
        /// Check if the data model has a minimum length attributes defined
        /// </summary>
        /// <param name="model">Model meta data</param>
        /// <returns>true if min length attribute set</returns>
        public static bool HasMinLengthValidation(this ModelMetadata model)
        {
            bool hashasMinLength = false;

            var validationItems = ((DefaultModelMetadata)model).ValidationMetadata.ValidatorMetadata;
            var hasStringValidationItems = validationItems.Any() && validationItems.Any(a => (a as ValidationAttribute).GetType().ToString().Contains("StringLengthAttribute"));
            if (hasStringValidationItems)
            {
                hashasMinLength = MinLength(model) != null;
            }

            return hashasMinLength;
        }
        /// <summary>
        /// returns the minimum length from attributes of the data model
        /// </summary>
        /// <param name="model">Model meta data</param>
        /// <returns>minimum length as an int</returns>
        public static int? MinLength(this ModelMetadata model)
        {
            int? minLength = null;
            var validationItems = ((DefaultModelMetadata)model).ValidationMetadata.ValidatorMetadata;

            if (validationItems.Any())
            {
                var stringLengthValidation = validationItems.DefaultIfEmpty(null)
                                           .FirstOrDefault(a => (a as ValidationAttribute)
                                           .GetType().ToString().Contains("StringLengthAttribute"));
                if (stringLengthValidation != null)
                {
                    minLength = (stringLengthValidation as StringLengthAttribute).MinimumLength;
                }
            }

            return minLength;
        }

        /// <summary>
        /// Check if the data model has a maximum length attributes defined
        /// </summary>
        /// <param name="model">Model meta data</param>
        /// <returns>true if max length attribute set</returns>
        public static bool HasMaxLengthValidation(this ModelMetadata model)
        {
            bool hasMaxLength = false;

            var validationItems = ((DefaultModelMetadata)model).ValidationMetadata.ValidatorMetadata;
            var hasStringValidationItems = validationItems.Any() && validationItems.Any(a => (a as ValidationAttribute).GetType().ToString().Contains("StringLengthAttribute"));
            if (hasStringValidationItems)
            {
                hasMaxLength = MaxLength(model) != null;
            }

            return hasMaxLength;
        }

        /// <summary>
        /// returns the maximum length from attributes of the data model
        /// </summary>
        /// <param name="model">Model meta data</param>
        /// <returns>maximum length as an int</returns>
        public static int? MaxLength(this ModelMetadata model)
        {
            int? maxLength = null;
            var validationItems = ((DefaultModelMetadata)model).ValidationMetadata.ValidatorMetadata;

            if (validationItems.Any())
            {
                var stringLengthValidation = validationItems.DefaultIfEmpty(null)
                                           .FirstOrDefault(a => (a as ValidationAttribute)
                                           .GetType().ToString().Contains("StringLengthAttribute"));
                if (stringLengthValidation != null)
                {
                    maxLength = (stringLengthValidation as StringLengthAttribute).MaximumLength;
                }
            }

            return maxLength;
        }
    }
}
