using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Biblio.models;

public class UserDtoIn
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string UserLastName { get; set;}
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
}

