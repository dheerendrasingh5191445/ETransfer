using E_TransferWebApi.Models;
using E_TransferWebApi.Repository;
using E_TransferWebApi.Services;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace E_TransferWebApi.Controllers
{
    [Route("api/HR")]
    public class HRController : Controller
    {
        // Service instances
        IHRService _service;
        public HRController(IHRService service)
        {
            _service = service;
        }

        //Method to get all the rquests pending with HR 
        // GET: api/HRController
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            try
            {
                List<HrViewModel> requestList = _service.GetAllRequest(id);
                if (requestList.Count == 0)
                {
                    return this.NotFound("There are no requests pending with the supervisor");
                }
                return Ok(requestList);
            }

            catch (TimeoutException e)
            {
                Console.WriteLine(e.StackTrace);
                return StatusCode(102);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.StackTrace);
                return StatusCode(500);
            }
        }
        //Method to get the data not updated in the database manually
        [HttpGet]
        [Route("GetDiscrepantRequest")]
        public IActionResult GetDiscrepantRequest()
        {
            try
            {
                // service call to get the records not updated
                List<DiscrepancyReport> reportList = _service.GetAllDiscrepantRecordsList();
                if (reportList.Count == 0)
                {
                    return this.NotFound("There are no requests pending with the supervisor");
                }
                return Ok(reportList); // returning the report if there is any discrepancy
            }

            catch (TimeoutException e)
            {
                Console.WriteLine(e.StackTrace);
                return StatusCode(102);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.StackTrace);
                return StatusCode(500);
            }
        }
    }
}