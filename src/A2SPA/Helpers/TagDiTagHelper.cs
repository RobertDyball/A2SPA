using Humanizer;
using Microsoft.AspNetCore.Mvc.ModelBinding.Metadata;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace A2SPA.Helpers
{
    [HtmlTargetElement("tag-di")]
    public class TagDiTagHelper : TagHelper
    {
        /// <summary>
        /// Name of data property 
        /// </summary>
        [HtmlAttributeName("for")]
        public ModelExpression For { get; set; }


        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            var dataType = ((DefaultModelMetadata)For.Metadata).DataTypeName;

            var labelTag = new TagBuilder("label");
            labelTag.InnerHtml.Append(For.Metadata.Description);
            labelTag.MergeAttribute("for", For.Name.Camelize());
            labelTag.AddCssClass("control-label");

            var inputTag = new TagBuilder("input");
            inputTag.AddCssClass("form-control");

            switch (dataType)
            {
                case "Password":
                    inputTag.MergeAttribute("type", dataType);
                    break;

                case "Currency":
                    inputTag.MergeAttribute("type", "number");
                    break;

                default:
                    inputTag.MergeAttribute("type", "text");
                    break;
            }

            inputTag.MergeAttribute("id", For.Name.Camelize());
            inputTag.MergeAttribute("name", For.Name.Camelize());
            inputTag.MergeAttribute("placeholder", For.Metadata.Description);

            if (((DefaultModelMetadata)For.Metadata).HasMinLengthValidation())
            {
                inputTag.Attributes.Add("minLength", ((DefaultModelMetadata)For.Metadata).MinLength().ToString());
            }

            if (((DefaultModelMetadata)For.Metadata).HasMaxLengthValidation())
            {
                inputTag.Attributes.Add("maxLength", ((DefaultModelMetadata)For.Metadata).MaxLength().ToString());
            }

            if (((DefaultModelMetadata)For.Metadata).IsRequired)
            {
                inputTag.Attributes.Add("required", "required");
            }

            inputTag.MergeAttribute("[(ngModel)]", For.CamelizedName());
            inputTag.TagRenderMode = TagRenderMode.StartTag;

            output.TagName = "div";
            output.Attributes.Add("class", "form-group");

            output.Content.AppendHtml(labelTag);

            // wrap the input tag with an input group, if needed
            switch (dataType)
            {
                case "Currency":
                    var divInputGroup = new TagBuilder("div");
                    divInputGroup.MergeAttribute("class", "input-group");
                    var spanInputGroupAddon = new TagBuilder("span");
                    spanInputGroupAddon.MergeAttribute("class", "input-group-addon");
                    spanInputGroupAddon.InnerHtml.Append("$");
                    divInputGroup.InnerHtml.AppendHtml(spanInputGroupAddon);
                    divInputGroup.InnerHtml.AppendHtml(inputTag);
                    output.Content.AppendHtml(divInputGroup);
                    break;

                default:
                    output.Content.AppendHtml(inputTag);
                    break;
            }
        }
    }
}
