using System;
using E_TransferWebApi.Models;
using E_TransferWebApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
namespace E_TransferWebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Cso")]
    public class CsoController : Controller
    {
        private ICsoService _service;
        public CsoController(ICsoService service)
        {
            _service = service;
        }
        [HttpGet]
        [Route("GetPendingCsoRequest/{id}")]
        public IActionResult GetPendingCsoRequest(string id)
        {
            try
            {
                //get the requests pending with Cso
                List<RequestDetails> requestList = _service.GetRequestPendingWithCso(id);
                if (requestList.Count == 0)
                {
                    return this.NotFound("There is no request pending with Cso");
                }
                return Ok(requestList); //return request list pending with cso with okay response 
            }
            catch (Exception)
            {
                //handle internal server error
                return StatusCode(500);
            }

        }
        [HttpGet]
        [Route("GetApprovedCsoRequest")]
        public IActionResult GetApprovedCsoRequest(string id)
        {
            try
            {
                List<RequestDetails> requestList = _service.GetRequestApprovedByCso(id);
                if (requestList.Count == 0)
                {
                    return this.NotFound("There is no request Approved by Cso");
                }
                return Ok(requestList); //return request list approved by cso with okay response
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }
        [HttpGet()]
        [Route("GetAssetDetail/{id}")]
        public IActionResult GetAssetDetails(string id)
        {
            try
            {
                List<AssetDetails> assetDetails = _service.GetAssetDetailsByEmpcode(id);
                if (assetDetails.Count == 0)
                    return NotFound("The Asset List for this Employer Code could not be found"); //not found
                return Ok(assetDetails); //return status code ok along with data
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]RequestDetails request)
        {
            try
            {

                if (_service.UpdateRequest(id, request))//update request status to cleared and appoved by cso
                {
                    _service.EmailbyCso(request.EmployeeCode, request); //mail for approval of request 
                    return new NoContentResult();
                }
                return BadRequest();
            }
            catch (ArgumentNullException e)
            {
                Console.WriteLine(e.StackTrace);//handling bad request
                return BadRequest();
            }
            catch (Exception)
            {
                return StatusCode(500); //internal server error
            }
        }
    }
}
