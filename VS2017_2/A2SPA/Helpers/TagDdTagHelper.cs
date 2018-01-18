﻿using Microsoft.AspNetCore.Mvc.ModelBinding.Metadata;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;
using System.Globalization;

namespace A2SPA.Helpers
{
    /// <summary>
    /// Tag Helper to display data
    /// </summary>
    [HtmlTargetElement("tag-dd")]
    public class TagDdTagHelper : TagHelper
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
        /// Option: directly set display format using Angular 5 pipe and pipe format values
        /// </summary>
        ///<remarks>This attribute sets both pipe type and the pipe filter parameters.
        /// Numeric formats for decimal or percent in Angular use a string with the following format: 
        /// a.b-c where:
        ///     a = minIntegerDigits is the minimum number of integer digits to use.Defaults to 1.
        ///     b = minFractionDigits is the minimum number of digits after fraction.Defaults to 0.
        ///     c = maxFractionDigits is the maximum number of digits after fraction.Defaults to 3.
        /// </remarks>
        /// <example>
        /// to format a decimal value as a percentage use "|percent" for the default Angular
        /// or for a custom percentage value eg. "| percent:'1:3-5' 
        /// </example>
        [HtmlAttributeName("pipe")]
        public string Pipe { get; set; } = null;

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            // get metadata, find data type
            var metadata = ((DefaultModelMetadata)For.Metadata);
            var dataType = metadata.DataTypeName;

            var pipe = string.Empty;

            string datePattern = CultureInfo.CurrentUICulture.DateTimeFormat.ShortDatePattern;
            // .net core uses "tt" for "AM/PM" whereas ANgular 5 uses "aa". 
            // TODO: consider a conversion class/method to handle this (or other potential issues)
            string timePattern = CultureInfo.CurrentUICulture.DateTimeFormat.ShortTimePattern.Replace("tt", "aa");

            //string currencyPattern = "'" + CultureInfo.CurrentUICulture.ThreeLetterISOLanguageName + "':true:'1.2.2'";

            // TODO: further expand datatypes here
            switch (dataType)
            {
                case "Date":
                    pipe = string.IsNullOrEmpty(Pipe) ? "|date:'" + datePattern + "'" : Pipe;
                    break;

                case "DateTime":
                    pipe = string.IsNullOrEmpty(Pipe) ? "|date:'" + datePattern + " " + timePattern + "'" : Pipe;
                    break;

                case "Time":
                    pipe = string.IsNullOrEmpty(Pipe) ? "|date:'" + timePattern + "'" : Pipe;
                    break;

                //case "Currency":
                //    pipe = string.IsNullOrEmpty(Pipe) ? "|currency:'" + currencyPattern + "'" : Pipe;
                //    break;

                default:
                    pipe = string.IsNullOrEmpty(Pipe) ? string.Empty : "|" + Pipe;
                    break;
            }

            var labelTag = new TagBuilder("label");
            labelTag.InnerHtml.Append(For.Metadata.Description);
            labelTag.AddCssClass("control-label");

            var pTag = new TagBuilder("p");
            pTag.AddCssClass("form-control-static");

            var tagContents = For.PopulateDataDisplayContents(pipe, Par, Var);
            pTag.InnerHtml.Append(tagContents);

            output.TagName = "div";
            output.Attributes.Add("class", "form-group");

            output.Content.AppendHtml(labelTag);
            output.Content.AppendHtml(pTag);
        }
    }
}
