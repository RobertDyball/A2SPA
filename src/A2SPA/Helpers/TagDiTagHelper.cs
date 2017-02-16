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
            var metadata = ((DefaultModelMetadata)For.Metadata);
            var propertyName = For.Name.Camelize();
            var dataType = metadata.DataTypeName;

            var shortLabelName = metadata.DisplayName ?? this.For.Name.Humanize();
            var labelName = metadata.Placeholder ?? shortLabelName;
            var description = For.Metadata.Description ?? labelName;

            var labelTag = new TagBuilder("label");
            labelTag.InnerHtml.Append(description);
            labelTag.MergeAttribute("for", propertyName);
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

            inputTag.MergeAttribute("id", propertyName);
            inputTag.MergeAttribute("name", propertyName);
            inputTag.MergeAttribute("placeholder", shortLabelName);
            inputTag.MergeAttribute("#" + propertyName, "ngModel");

            TagBuilder validationBlock = new TagBuilder("div");
            validationBlock.MergeAttribute("*ngIf", string.Format("{0}.errors", propertyName));
            validationBlock.MergeAttribute("class", "alert alert-danger");

            if (metadata.HasMinLengthValidation())
            {
                var minLength = metadata.MinLength();
                var minLengthValidation = new TagBuilder("div");
                minLengthValidation.MergeAttribute("[hidden]", string.Format("!{0}.errors.minlength", propertyName));
                minLengthValidation.InnerHtml.Append(string.Format("{0} must be at least {1} characters long", labelName, minLength));
                validationBlock.InnerHtml.AppendHtml(minLengthValidation);

                inputTag.Attributes.Add("minLength", minLength.ToString());
            }

            if (metadata.HasMaxLengthValidation())
            {
                var maxLength = metadata.MaxLength();
                var maxLengthValidation = new TagBuilder("div");
                maxLengthValidation.MergeAttribute("[hidden]", string.Format("!{0}.errors.maxlength", propertyName));
                maxLengthValidation.InnerHtml.Append(string.Format("{0} cannot be more than {1} characters long", labelName, maxLength));
                validationBlock.InnerHtml.AppendHtml(maxLengthValidation);

                inputTag.Attributes.Add("maxLength", maxLength.ToString());
            }

            if (metadata.HasRegexValidation())
            {
                var regexValidation = new TagBuilder("div");
                regexValidation.MergeAttribute("[hidden]", string.Format("!{0}.errors.pattern", propertyName));
                regexValidation.InnerHtml.Append(string.Format("{0} is invalid", labelName));
                validationBlock.InnerHtml.AppendHtml(regexValidation);

                inputTag.Attributes.Add("pattern", metadata.RegexExpression());
            }

            if (metadata.IsRequired)
            {
                var requiredValidation = new TagBuilder("div");
                requiredValidation.MergeAttribute("[hidden]", string.Format("!{0}.errors.required", propertyName));
                requiredValidation.InnerHtml.Append(string.Format("{0} is required", labelName));
                validationBlock.InnerHtml.AppendHtml(requiredValidation);

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

            output.Content.AppendHtml(validationBlock);
        }
    }
}
