namespace GameCore.Models.User
{

    //testing String.empty, lo cambiare luego
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = String.Empty;
        public string Email { get; set; } = String.Empty;
        public string Password { get; set; } = String.Empty;

        public int RolId { get; set; }
        public DateTime CreatedAt { get; set; }

    }
}