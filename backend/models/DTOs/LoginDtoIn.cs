using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Biblio.models;

public class LoginDtoIn
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
}

