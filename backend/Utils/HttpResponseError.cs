using System;

namespace GameCore.Utils;

using System.Net;
public class HttpResponseError : Exception
{

    public string Message { get; set; }

    public HttpStatusCode StatusCode { get; set; }

    public HttpResponseError(HttpStatusCode statusCode, string message) : base(message)
    {
        StatusCode = statusCode;
        Message = message;
    }
}
