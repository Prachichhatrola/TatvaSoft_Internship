using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace Business_Logic_Layer.JWTService
{
    public class JwtService
    {
        private readonly string _secretKey;
        private readonly double _tokenDuration;

        public JwtService(IConfiguration configuration)
        {
            _tokenDuration = Convert.ToDouble( configuration.GetSection("JwtConfig:Duration").Value);
            _secretKey = configuration.GetSection("JwtConfig:Key").Value.ToString();
        }

        public string GenerateToken(string firstName, string userType)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim("FirstName",firstName),
                new Claim(ClaimTypes.Role,userType)
            };
             

            var token = new JwtSecurityToken(
                 issuer: "localhost",
                 audience: "localhost",
                 claims: claims,
                 expires: DateTime.Now.AddHours(_tokenDuration),
                 signingCredentials : credentials
                );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
