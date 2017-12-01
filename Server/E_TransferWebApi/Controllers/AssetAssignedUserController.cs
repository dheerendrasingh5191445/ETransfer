using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using E_TransferWebApi.Models;
using E_TransferWebApi.Services;

namespace E_TransferWebApi.Controllers
{
    [Route("api/AssetAssignedUser")]
    public class AssetAssignedUserController : Controller
    {
        IAssetAssignedUserService _service;
        public AssetAssignedUserController(IAssetAssignedUserService service)
        {
            _service = service;
        }

        //Method to show the asset clearance report to the asset controller
        // GET: api/values
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            List<AssetDetails> assetList = _service.GetAssetListByEmpcode(id); //service call
            if (assetList.Count == 0)
            {
                return this.NotFound("The Asset list could not be found");
            }
            return Json(assetList);
        }
        [HttpGet]
        [Route("GetHistory/{id}")]
        public IActionResult GetHistory(string id)
        {
            List<AssetDetails> acceptedAssetList = _service.GetAcceptedAssetsByEmpCode(id);
            if (acceptedAssetList.Count == 0)
            {
                return this.NotFound("The Asset list is empty");
            }
            return Json(acceptedAssetList);
        }

        //Method to update the asset after the employee accept/reject the asset acceptence request
        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]Assets asset)
        {
            if (asset == null || asset.AssetId != id)
            {
                return BadRequest();  //Validation that object and id can't be null
            }
            if (_service.UpdateAssetStatus(id, asset)) //service call
            {
                return new NoContentResult();
            }
            return BadRequest();
        }

    }
}