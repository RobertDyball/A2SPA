using Humanizer;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace A2SPA.Helpers
{
    /// <summary>
    /// Tag Helper for Table columns headers to display column name
    /// </summary>
    [HtmlTargetElement("th", Attributes=columnHeadingAttribute)]
    public class TabCHTagHelper : TagHelper
    {
        private const string columnHeadingAttribute = "chfor";

        /// <summary>
        /// Name of data property 
        /// </summary>
        [HtmlAttributeName(columnHeadingAttribute)]
        public ModelExpression ChFor { get; set; }

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            var labelTag = ChFor.Metadata.PropertyName.Humanize();
            output.Content.AppendHtml(labelTag);
        }
    }
}
