using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.ModelBinding.Metadata;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace A2SPA.Helpers
{
    public static class RegularExpressionValidation
    {
        /// <summary>
        /// Check if the underlying data model has a regular expression validation expression attribute defined
        /// </summary>
        /// <param name="model">Model meta data</param>
        /// <returns>true if regex attribute set</returns>
        public static bool HasRegexValidation(this ModelMetadata model)
        {
            bool hasRegex = false;

            var items = ((DefaultModelMetadata)model).ValidationMetadata.ValidatorMetadata;
            hasRegex = items.Any() && items.Any(a => (a as ValidationAttribute).GetType().ToString().Contains("RegularExpressionAttribute"));

            return hasRegex;
        }
        /// <summary>
        /// returns the regular expression set in the attributes of the data model
        /// </summary>
        /// <param name="model">Model meta data</param>
        /// <returns>regex expression as a string</returns>
        public static string RegexExpression(this ModelMetadata model)
        {
            string regex = string.Empty;
            var items = ((DefaultModelMetadata)model).ValidationMetadata.ValidatorMetadata;
            if (items.Any())
            {
                var regexExpression = items.DefaultIfEmpty(null).FirstOrDefault(a => (a as ValidationAttribute).GetType().ToString().Contains("RegularExpressionAttribute"));
                if (regexExpression != null)
                {
                    regex = (regexExpression as RegularExpressionAttribute).Pattern;
                }
            }


            return regex;
        }
    }
}
