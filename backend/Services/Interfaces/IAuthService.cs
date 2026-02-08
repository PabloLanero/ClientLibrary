using System.Security.Claims;
using Biblio.models;

namespace Biblio.Services
{
    public interface IAuthService
    {
        public Task<string> Login(LoginDtoIn userDtoIn);
        public Task<string> Register(UserDtoIn userDtoIn);
        public string GenerateToken(Usuario userDtoOut);
        public bool HasAccessToResource(int requestedUserID, ClaimsPrincipal user);


    }
}
