using Humanizer;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace A2SPA.Helpers
{
    /// <summary>
    /// Tag Helper for Table columns headers to display column name
    /// </summary>
    [HtmlTargetElement("tab-ch")]
    public class TabCHTagHelper : TagHelper
    {
        /// <summary>
        /// Name of data property 
        /// </summary>
        [HtmlAttributeName("for")]
        public ModelExpression For { get; set; }

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            var labelTag = new TagBuilder("span");
            labelTag.InnerHtml.Append(For.Metadata.PropertyName.Humanize());

            output.TagName = "span";
            output.Content.AppendHtml(labelTag);
        }
    }
}
