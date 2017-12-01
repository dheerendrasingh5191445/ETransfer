using E_TransferWebApi.Models;
using E_TransferWebApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace E_TransferWebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/EmpDatabase")]
    public class EmpDatabaseController : Controller
    {
        private IEmpDbService _empservice;

        public EmpDatabaseController(IEmpDbService empservice)
        {
            _empservice = empservice;
        }
        // GET: api/EmpDatabase
        [HttpGet]
        public IEnumerable<EmployeeDetails> Get( )
        {
            return null;
        }

        // GET: api/EmpDatabase/5
        //this method is calling service method to fetch the subordinates of employee
        [HttpGet]
        [Route("GetMyEmployee/{id}")]
        public IActionResult GetMyEmployee(string id)
        {
            try
            {
                List<EmployeeDetails> list = _empservice.GetAllSubOrdinates(id);
                if (list.Count == 0)
                {
                    return NoContent();
                }
                    return Ok(Json(list));
            }
            catch(Exception )
            {
                return NotFound();
            }
         
        }

        // GET: api/EmpDatabase/5
        //this method is calling service method to fetch the subordinates of employee
        [HttpGet]
        [Route("GetOneEmployee/{id}")]
        public IActionResult GetOneEmployee(string id)
        {
            try
            {
                EmployeeDetails list = _empservice.GetOneEmp(id);
                if (list == null)
                {
                    return NoContent();
                }
                return Ok(Json(list));
            }
            catch (Exception )
            {
                return NotFound();
            }

        }

        // POST: api/EmpDatabase
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }
        
        // PUT: api/EmpDatabase/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
