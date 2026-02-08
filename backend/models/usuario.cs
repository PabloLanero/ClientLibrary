namespace Biblio.models
{
    public class Usuario
    {
        public int? Id {get;set;}
        public string? Nombre {get;set;}
        public string? Apellido {get;set;}
        public string? Password {get;set;}
        public string? Email {get;set;}
        public string? Rol {get;set;} = Roles.User;
        public DateTime? FechaRegistro {get;set;} = DateTime.Now;
        public bool? EstaActivo {get;set;} = true;
        public Usuario(){}
    }
}