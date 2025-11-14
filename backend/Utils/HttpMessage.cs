using System;

namespace GameCore.Utils;

public class HttpMessage
{
    public string Message { get; set; }

    public HttpMessage(string message)
    {
        Message = message;
    }
}
