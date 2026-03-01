using System.Security.Claims;
using Biblio.models;

namespace Biblio.Services
{
    public interface IAuthService
    {
        public Task<SigIn> Login(LoginDtoIn userDtoIn);
        public Task<SigIn> Register(UserDtoIn userDtoIn);
        public SigIn GenerateToken(Usuario userDtoOut);
        public bool HasAccessToResource(int requestedUserID, ClaimsPrincipal user);


    }
}
