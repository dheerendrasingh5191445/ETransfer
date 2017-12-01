using E_TransferWebApi.Models;
using E_TransferWebApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace E_TransferWebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/User")]
    public class UserController : Controller
    {
        IUserService _service;
        public UserController(IUserService service)
        {
            _service = service;
        }

        // GET api/values/5
        //this method will get all the information regarding the user request information by the employee code
        //and showing the request pending and progress information
        [HttpGet]
        [Route("GetRequest/{id}")]
        public IActionResult GetRequest(string id)
        {
            try
            {
                //calling the service method to get the information of the employee by the employee code
                RequestDetails request = _service.GetUserByEmpcode(id);//service call
                if (request != null)
                {
                    //if employee is found by id it will return bad request
                    return Ok(request);
                }
                else
                {
                    //if employee is not found by id it will return an employee
                    return BadRequest();
                }
            }
            catch
            {
                // it will represent an internal server error
                return StatusCode(500);

            }
        }

        //Method to get the employee by id
        // GET api/values/5
        [HttpGet]
        [Route("GetEmployee/{id}")]
        public IActionResult GetEmployee(string id)
        {
            try
            {
                EmployeeDetails employee = _service.GetUserDetails(id);//service call
                if (employee == null)
                {
                    //if employee is not found by id it will return bad request
                    return BadRequest();
                }
                else
                {
                    //if employee is found by id it will return an employee
                    return Ok(employee);
                }
            }
            catch
            {
                // it will represent an internal server error
                return StatusCode(500);
            }
        }
    }
}