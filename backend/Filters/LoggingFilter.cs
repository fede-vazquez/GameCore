using System;

namespace GameCore.Filters;

using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
public class LoggingFilter : IActionFilter
{
    private readonly ILogger<LoggingFilter> _logger;

    public LoggingFilter(ILogger<LoggingFilter> logger)
    {
        _logger = logger;
    }

    public void OnActionExecuting(ActionExecutingContext context)
    {
        _logger.LogInformation(
            "Executing action {ActionName} with parameters {@Parameters}",
            context.ActionDescriptor.DisplayName,
            context.ActionArguments
        );
    }

    public void OnActionExecuted(ActionExecutedContext context)
    {
        _logger.LogInformation(
            "Executed action {ActionName} with result {Result}",
            context.ActionDescriptor.DisplayName,
            context.Result
        );
    }
}
