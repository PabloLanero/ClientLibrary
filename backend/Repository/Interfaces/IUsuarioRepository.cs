using Biblio.models;

namespace Biblio.Repositories
{
    public interface IUsuarioRepository
    {
        public Task<List<Usuario>> GetUsuariosAsync(bool OrderAsc);
        public Task<Usuario> GetOneUsuarioAsync(int id);
        public Task<Usuario> PostUsuarioAsync(Usuario usuario);
        public Task<bool> PutUsuarioAsync(Usuario usuario);
        public Task<bool> DeleteUsuarioAsync(int id);
        public Task<Usuario> AddUserFromCredentials(UserDtoIn userDtoIn);
        public Task<Usuario> GetUserFromCredentials(LoginDtoIn loginDtoIn);
    }
}