using System;

namespace GameCore.Services;

using BC = BCrypt.Net;


public interface IEncoderServices
{
    string Encode(string value);
    bool Verify(string value, string hash);
}
public class EncoderServices : IEncoderServices
{
    public string Encode(string value)
    {
        var salt = BC.BCrypt.GenerateSalt(13);
        string encoded = BC.BCrypt.HashPassword(value, salt);
        return encoded;
    }

    public bool Verify(string value, string hash)
    {
        bool matched = BC.BCrypt.Verify(value, hash);
        return matched;
    }
}
