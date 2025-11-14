using System;

namespace GameCore.Utils;

using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
public class AuthOperationFilter : IOperationFilter
{
    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
        var Attributes = context.ApiDescription.CustomAttributes();
        bool IsAuthorize = Attributes.Any(attr => attr.GetType() == typeof(AuthorizeAttribute));
        bool IsAllowAnonymous = Attributes.Any(attr => attr.GetType() == typeof(AllowAnonymousAttribute));

        if (!IsAuthorize || IsAllowAnonymous) return;

        var reference = new OpenApiReference
        {
            Type = ReferenceType.SecurityScheme,
            Id = "Token"
        };

        var securityScheme = new OpenApiSecurityScheme
        {
            Reference = reference,
        };

        var requirement = new OpenApiSecurityRequirement
        {
            [securityScheme] = []
        };

        operation.Security = new List<OpenApiSecurityRequirement> {
                requirement
            };
    }
}
