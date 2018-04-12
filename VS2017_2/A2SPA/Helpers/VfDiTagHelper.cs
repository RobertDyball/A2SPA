using Humanizer;
using Microsoft.AspNetCore.Mvc.ModelBinding.Metadata;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace A2SPA.Helpers
{
    /// <summary>
    /// Tag helper to generate form group and form controls for data entry
    /// </summary>
    [HtmlTargetElement("vfdi")]
    public class VfDiTagHelper : TagHelper
    {
        /// <summary>
        /// Alternate name to set angular data-binding to
        /// </summary>
        [HtmlAttributeName("var")]
        public string Var { get; set; } = null;

        /// <summary>
        /// Alternate name to set angular parent data-binding to
        /// </summary>
        [HtmlAttributeName("par")]
        public string Par { get; set; } = null;

        /// <summary>
        /// Name of data property 
        /// </summary>
        [HtmlAttributeName("for")]
        public ModelExpression For { get; set; }

        /// <summary>
        /// Name of options property 
        /// </summary>
        [HtmlAttributeName("options")]
        public string Options { get; set; } = null;

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            // get metadata names, property name and data type
            var metadata = ((DefaultModelMetadata)For.Metadata);
            var propertyName = For.Name.Camelize();
            var dataType = metadata.DataTypeName;
            var options = string.IsNullOrEmpty(Options) ? string.Empty : Options.ToLower();

            // find best fit for labels and descriptions
            var shortLabelName = metadata.DisplayName ?? this.For.Name.Humanize();
            var labelName = metadata.Placeholder ?? shortLabelName;
            var description = For.Metadata.Description ?? labelName;

            // generate the label, point to the data entry input control
            var labelTag = new TagBuilder("label");
            labelTag.InnerHtml.Append(description);
            labelTag.MergeAttribute("for", propertyName);
            //labelTag.AddCssClass("control-label");

            // add the input control; TODO: add textarea, date picker support
            TagBuilder inputTag;

            string localDateFormat = System.Globalization.CultureInfo.CurrentCulture.DateTimeFormat.ShortDatePattern.ToString().ToLower();
            localDateFormat = localDateFormat.Contains("dd") ? localDateFormat : localDateFormat.Replace("d", "dd");
            localDateFormat = localDateFormat.Contains("yyyy") ? localDateFormat.Replace("yyyy", "yy"): localDateFormat;

            // TODO: further expand datatypes here
            switch (dataType)
            {
                case "Date":
                    inputTag = new TagBuilder("p-calendar");
                    // from local server date time format (eg dd/MM/yyyy) convert to uppercase to suite PrimeNG (eg dd/mm/yyyy)
                    inputTag.MergeAttribute("dateFormat", localDateFormat);
                    break;

                case "DateTime":
                    inputTag = new TagBuilder("p-calendar");
                    // from local server date time format (eg dd/MM/yyyy) convert to uppercase to suite PrimeNG (eg dd/mm/yyyy)
                    inputTag.MergeAttribute("dateFormat", localDateFormat);
                    inputTag.MergeAttribute("[showTime]", "true");
                    break;

                case "Time":
                    inputTag = new TagBuilder("p-calendar");
                    inputTag.MergeAttribute("[timeOnly]", "true");
                    break;

                case "Password":
                    inputTag = new TagBuilder("input");
                    inputTag.MergeAttribute("type", dataType);
                    break;

                case "Currency":
                    inputTag = new TagBuilder("input");
                    inputTag.MergeAttribute("type", "number");
                    break;

                default:
                    inputTag = new TagBuilder("input");
                    inputTag.MergeAttribute("type", "text");
                    break;
            }


            // bind angular data model to the control,
            switch (dataType)
            {
                case "Date":
                case "DateTime":
                case "Time":
                    inputTag.TagRenderMode = TagRenderMode.Normal;
                    break;

                default:
                    inputTag.TagRenderMode = TagRenderMode.StartTag;
                    inputTag.MergeAttribute("#" + propertyName, "ngModel");
                    break;
            }

            // common attributes for data input control here
            inputTag.AddCssClass("form-control");
            inputTag.MergeAttribute("[(ngModel)]", For.GetDataBindVariableName(Par, Var));
            inputTag.MergeAttribute("id", propertyName);
            inputTag.MergeAttribute("name", propertyName);
            inputTag.MergeAttribute("placeholder", shortLabelName);

            // set up validation conditional DIV's here; only show error if modifications to form have been made
            TagBuilder outerValidationBlock = new TagBuilder("div");
            outerValidationBlock.MergeAttribute("*ngIf", string.Format("!!{0} && {0}.errors && ({0}.dirty || {0}.touched)", propertyName));

            // .. and then, only if an error in data entry
            TagBuilder validationBlock = new TagBuilder("div");
            validationBlock.MergeAttribute("*ngIf", string.Format("!!{0} && {0}.errors", propertyName));
            validationBlock.MergeAttribute("class", "alert alert-danger");

            // Handle minimum, maximum, required, regex and other validation. TODO: refactor common code out
            if (metadata.HasMinLengthValidation())
            {
                var minLength = metadata.MinLength();
                var minLengthValidation = new TagBuilder("div");
                minLengthValidation.MergeAttribute("[hidden]", string.Format("!!{0} && !{0}.errors.minLength", propertyName));
                minLengthValidation.InnerHtml.Append(string.Format("{0} must be at least {1} characters long", labelName, minLength));
                validationBlock.InnerHtml.AppendHtml(minLengthValidation);

                inputTag.Attributes.Add("minLength", minLength.ToString());
            }

            if (metadata.HasMaxLengthValidation())
            {
                var maxLength = metadata.MaxLength();
                var maxLengthValidation = new TagBuilder("div");
                maxLengthValidation.MergeAttribute("[hidden]", string.Format("!!{0} && !{0}.errors.maxLength", propertyName));
                maxLengthValidation.InnerHtml.Append(string.Format("{0} cannot be more than {1} characters long", labelName, maxLength));
                validationBlock.InnerHtml.AppendHtml(maxLengthValidation);

                inputTag.Attributes.Add("maxLength", maxLength.ToString());
            }

            if (metadata.HasRegexValidation())
            {
                var regexValidation = new TagBuilder("div");
                regexValidation.MergeAttribute("[hidden]", string.Format("!!{0} && !{0}.errors.pattern", propertyName));
                regexValidation.InnerHtml.Append(string.Format("{0} is invalid", labelName));
                validationBlock.InnerHtml.AppendHtml(regexValidation);

                inputTag.Attributes.Add("pattern", metadata.RegexExpression());
            }

            if (metadata.IsRequired)
            {
                var requiredValidation = new TagBuilder("div");
                requiredValidation.MergeAttribute("[hidden]", string.Format("!!{0} && !{0}.errors.required", propertyName));
                requiredValidation.InnerHtml.Append(string.Format("{0} is required", labelName));
                validationBlock.InnerHtml.AppendHtml(requiredValidation);

                inputTag.Attributes.Add("required", "required");
            }

            // TODO: if adding say text area, you want closing tag. For input tag you do not have closing or self-closing

            // now generate the outer wrapper for the form group, get ready to start filling it with content prepared above
            output.TagName = "div";
            output.Attributes.Add("class", "form-group");

            // first the label
            output.Content.AppendHtml(labelTag);

            // Some input controls use bootstrap "input group"- wrap the input tag with an input group, if needed
            switch (dataType)
            {
                case "Date":
                case "DateTime":
                case "Time":
                    inputTag.RenderEndTag();

                    var divInputGroupDt = new TagBuilder("div");
                    divInputGroupDt.MergeAttribute("class", "input-group");
                    divInputGroupDt.InnerHtml.AppendHtml(inputTag);
                    output.Content.AppendHtml(divInputGroupDt);
                    break;

                case "Currency":
                    var divInputGroup = new TagBuilder("div");
                    divInputGroup.MergeAttribute("class", "input-group");

                    if (!options.Contains("nosymbol"))
                    {
                        string localCurrencyFormat = System.Globalization.CultureInfo.CurrentCulture.NumberFormat.CurrencySymbol.ToString();

                        var spanInputGroupPrepend = new TagBuilder("span");
                        spanInputGroupPrepend.MergeAttribute("class", "input-group-text");
                        spanInputGroupPrepend.InnerHtml.Append(localCurrencyFormat);

                        var divInputGroupPrepend = new TagBuilder("div");
                        divInputGroupPrepend.MergeAttribute("class", "input-group-prepend");
                        divInputGroupPrepend.InnerHtml.AppendHtml(spanInputGroupPrepend);

                        divInputGroup.InnerHtml.AppendHtml(divInputGroupPrepend);
                    }

                    divInputGroup.InnerHtml.AppendHtml(inputTag);

                    if (options.Contains("integercurrency"))
                    {
                        var spanInputGroupAppend = new TagBuilder("span");
                        spanInputGroupAppend.MergeAttribute("class", "input-group-text");
                        spanInputGroupAppend.InnerHtml.Append(".00");

                        var divInputGroupAppend = new TagBuilder("span");
                        divInputGroupAppend.MergeAttribute("class", "input-group-append");
                        divInputGroupAppend.InnerHtml.AppendHtml(spanInputGroupAppend);

                        divInputGroup.InnerHtml.AppendHtml(divInputGroupAppend);
                    }

                    output.Content.AppendHtml(divInputGroup);
                    break;

                default:
                    // most of the time we simply append the input controls prepared above
                    output.Content.AppendHtml(inputTag);
                    break;
            }

            // add the validation prepared earlier, to the end, last of all
            outerValidationBlock.InnerHtml.AppendHtml(validationBlock);
            output.Content.AppendHtml(outerValidationBlock);
        }
    }
}
