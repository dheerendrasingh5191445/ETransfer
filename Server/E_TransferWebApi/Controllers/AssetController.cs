using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using E_TransferWebApi.Models;
using E_TransferWebApi.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace E_TransferWebApi.Controllers
{
    [Route("api/Asset")]
    public class AssetController : Controller
    {
        //service dependency injected
        IAssetControllerService _service;
        public AssetController(IAssetControllerService service)
        {
            _service = service;
        }

        //Method to get the assets details for the asset controller
        [HttpGet]
        [Route("Get")]
        public IActionResult Get()
        {
            try
            {
                List<AssetDetails> list = _service.GetRequestStatus(); //service call
                if (list.Count == 0)
                {
                    return this.NotFound("There are no asset details to show");
                }
                return Ok(list); //returning the list 
            }
            //exception handling
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
                List<AssetControllerDiscrepancyReport> reportList = _service.GetDiscrepantRecords();
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

        //Method to get the asset detail for single employee
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            try
            {
                List<Assets> assetList = _service.GetAssetDetailsByEmpcode(id);
                if (assetList.Count == 0)
                {
                    return this.NotFound("The Asset list for this Employee could not be found");
                }
                return Ok(assetList);
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
