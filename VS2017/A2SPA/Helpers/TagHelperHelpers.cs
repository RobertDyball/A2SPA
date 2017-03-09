using Humanizer;
using Microsoft.AspNetCore.Mvc.ModelBinding.Metadata;
using Microsoft.AspNetCore.Mvc.ViewFeatures;

namespace A2SPA.Helpers
{
    public static class TagHelperHelpers
   {
        /// <summary>
        /// Create the angular binding variable name
        /// </summary>
        /// <remarks>
        /// If 'par' (parent name) and 'var' (property name override) are not supplied, then the name of the variable used for 
        /// angular data-binding is taken directly from the view model property name.
        /// If parent (par) and override name (var) are both supplied the angular data-bind variable is set to 'par.var'
        /// If the 'var' is supplied and 'par' (parent) not supplied, then only the 'var' is used
        /// </remarks>
        /// <param name="modelExpression">the model expression</param>
        /// <param name="Par">optional parent name</param>
        /// <param name="Var">optional property name, to override model property</param>
        /// <returns></returns>
        public static string GetDataBindVariableName(this ModelExpression modelExpression, string Par, string Var)
        {
            var className = modelExpression.Metadata.ContainerType.Name;
            var propertyName = modelExpression.Name;

            var prefixName = string.IsNullOrEmpty(Par) ? className.Camelize() : Par;
            var varName = string.IsNullOrEmpty(Var) ? propertyName.Camelize() : Var;

            return string.Format("{0}.{1}", prefixName, varName);
        }

        /// <summary>
        /// Returns a string populated with angular data binding expression to display data
        /// </summary>
        /// <param name="modelFor">data model as a ModelExpression</param>
        /// <param name="pipe">pipe string, optional</param>
        /// <param name="parentID">optional parent variable name, overrides default data class name</param>
        /// <param name="varName">optional variable name, overrides default data property name</param>
        /// <returns>string populated with Angular data binding expression, and optional pipe if supplied</returns>
        public static string PopulateDataDisplayContents(this ModelExpression modelFor, string pipe, string parentID, string varName)
        {
            string dataBindExpression = ((DefaultModelMetadata)modelFor.Metadata).DataTypeName == "Password"
                                                ? "******"
                                                : "{{" + modelFor.GetDataBindVariableName(parentID, varName) + pipe + "}}";

            return dataBindExpression;
        }
    }
}
