using AuthenticationWebApi.Models;
using AuthenticationWebApi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace AuthenticationWebApi.Controllers
{
    [Route("api/[controller]")]
    public class TokenHandlingController :Controller
    {
        //some config in the appsettings.json
        //getting Audience configuration from the model which is defined in to the configuration file
        private readonly IOptions<Audience> _settings;
        private readonly IConfiguration _config;
        //creating obj for Role identification service for dependency injection
        private readonly IRoleIdentificationService _roleIdentificationService;

        //creating the HttpClient object for the get or post call to the server
        private readonly HttpClient _client; 

        public TokenHandlingController(IRoleIdentificationService roleIdentificationService, IOptions<Audience> settings, IConfiguration config)
        {
            _roleIdentificationService = roleIdentificationService;
            _settings = settings;
            _config = config;
            _client = new HttpClient();
            _client.DefaultRequestHeaders.Accept.Clear();
            _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

        [HttpGet]
        [Route("TokenAuthenticationResult")]
        public async Task TokenAuthenticationResult([FromQuery]string token)
        {        
            //url of innitian for the token authentication and employee information
            string url = _config["iniitian:AuthUrl"];
            try
            {
                if (token != null)
                {
                    //here we will call the server for the data with the token by using HttpClient GetAsync method
                    using (HttpResponseMessage response = await _client.GetAsync(url + token))
                    {
                        if (response != null)
                        {
                            string value=null;
                            //here we will get the data from the  HttpResponseMeesage 
                            //HttpContent will store the content from the response
                            using (HttpContent content = response.Content)
                            {
                                if (content != null)
                                {
                                    //reading data asynchronously from content
                                    var data = content.ReadAsStringAsync().Result;
                                    //parsing data into the json formate
                                    var obj = JObject.Parse(data);
                                    //retrieving employee id from the json
                                    string employeeCode =(string) obj.SelectToken("UserID");
                                    //retrieving employee Name from the json
                                    string employeeName = (string) obj.SelectToken("UserName");
                                    //retrieving employee Email from the json
                                    string emailId = (string) obj.SelectToken("Email");
                                    //retrieving token validation from the json
                                    string validValue = (string) obj.SelectToken("isvalid");
                                    //passing employee code for the role identification
                                    string roleCode = RoleIdentification(employeeCode);
                                    //setting the model for generating JWT token
                                    Employee emp = new Employee { EmpCode= employeeCode, EmpName= employeeName, Email= emailId, Valid= validValue, Role= roleCode };
                                    //storing JWT encrypted token in value and redirecting token to the angular application frond end
                                    value= GetJWT(emp);
                                    HttpContext.Response.Redirect("http://localhost:4200/login/"+value);
                                }
                            }
                         //   return value;
                        }
                        else
                        {
                            throw new NullReferenceException();
                        }
                    }
                }
                else
                {
                    throw new NoNullAllowedException();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        private string GetJWT(Employee emp)
        {
            //creating claims for setting the encrypted value for the transfer between unsecure network
            var claims = new[]
            {
                //setting claim for the employee code
                new Claim(JwtRegisteredClaimNames.Sid, emp.EmpCode),
                //setting claim for the employee Name
                new Claim(JwtRegisteredClaimNames.Sub, emp.EmpName),
                //setting claim for the employee Email ID
                new Claim(JwtRegisteredClaimNames.Email, emp.Email),
                //setting claim for the validation of the employee
                new Claim(JwtRegisteredClaimNames.Prn,emp.Valid), 
                //setting claim for the validation of the employee Role
                new Claim(JwtRegisteredClaimNames.Typ, emp.Role),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };
            //getting the secret key from the configuration file
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_settings.Value.Secret));
            //encrypting the key using hmacSha256 algorithm
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            //registering the issuer and audience on the basic of Iss value which come from the configuration file
            var token = new JwtSecurityToken(
                issuer: _settings.Value.Iss,
                audience: _settings.Value.Aud,
                claims: claims,
                //add the expiration time for the token
                expires: DateTime.UtcNow.AddMinutes(15),
                signingCredentials: creds
            );

            var response=new
            {
                //setting the response of JWT and providing the token value and expiration time in response
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expiration = token.ValidTo
            };
            //convert the response in to the json object
            return JsonConvert.SerializeObject(response);
        }

        [HttpGet]
        [Route("RoleIdentification/{empCode}")]
        public string RoleIdentification(string empCode)
        {
            try
            {
                //seraching into the niit database for the role of user in our application
                string role = _roleIdentificationService.RoleIdentification(empCode);
                //role variable will store the value kind of role user has in niit
                if (role == "No role found")
                {
                    //if user doesn't have any kind of role in niit which is expected by our application for user
                    return "Not a User";
                }
                //if role has been find for user in our application
                //return the role to the angular app
                return role;
            }
            catch (Exception ex)
            {
                //if any kind of exception is thrown in accessing the role for user
                
                return "somethng went wrong";
            }
        }
    }
}
