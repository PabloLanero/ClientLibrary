using System.IdentityModel.Tokens.Jwt;
using System.Runtime.Serialization;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Biblio;
using Biblio.models;
using Biblio.Repositories;
using System.Threading.Tasks;

namespace Biblio.Services
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;
        private readonly IUsuarioRepository _repository;

        public AuthService(IConfiguration configuration, IUsuarioRepository repository)
        {
            _configuration = configuration;
            _repository = repository;
        }

        public async Task<string> Login(LoginDtoIn loginDtoIn) {
            Usuario user = await _repository.GetUserFromCredentials(loginDtoIn);
            return GenerateToken(user);
        }

        public async Task<string> Register(UserDtoIn userDtoIn) {
            var user = await _repository.AddUserFromCredentials(userDtoIn);
            return GenerateToken(user);
        }

        public string GenerateToken(Usuario userDtoOut) {
            System.Console.WriteLine("AAA3º");
            var key = Encoding.UTF8.GetBytes(_configuration["JWT:SecretKey"]); 
            System.Console.WriteLine("AAAAAAA6");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = _configuration["JWT:ValidIssuer"],
                Audience = _configuration["JWT:ValidAudience"],
                Subject = new ClaimsIdentity(new Claim[] 
                    {
                        new Claim(ClaimTypes.NameIdentifier, Convert.ToString(userDtoOut.Id)),
                        new Claim(ClaimTypes.Name, userDtoOut.Nombre),
                        new Claim(ClaimTypes.Role, userDtoOut.Rol),
                        new Claim(ClaimTypes.Email, userDtoOut.Email),
                    }),
                Expires = DateTime.UtcNow.AddDays(7), // AddMinutes(60)
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            System.Console.WriteLine("AAAAAAAAA9");

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);
            return tokenString;
        } 
        public bool HasAccessToResource(int requestedUserID, ClaimsPrincipal user) 
        {
            var userIdClaim = user.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            if (userIdClaim is null || !int.TryParse(userIdClaim.Value, out int userId)) 
            { 
                return false; 
            }
            var isOwnResource = userId == requestedUserID;

            var roleClaim = user.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role);
            if (roleClaim != null) return false;
            var isAdmin = roleClaim!.Value == Roles.Admin;
            
            var hasAccess = isOwnResource || isAdmin;
            return hasAccess;
        }
     

    }
}
