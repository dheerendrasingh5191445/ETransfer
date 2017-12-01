using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using E_TransferWebApi.Repository;
using E_TransferWebApi.Models;
using E_TransferWebApi.Services;

namespace E_TransferWebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/AssetDb")]
    public class AssetDbController : Controller
    {
        private readonly IAssetDbService assetSer;
        public AssetDbController(IAssetDbService assetSer)
        {
            this.assetSer = assetSer;
        }

        // GET: api/AssetDb
        //asset detail for all employees as future purpose..
        [HttpGet]
        public List<AssetDetails> Get()
        {
            return null;
        }

        // GET: api/AssetDb/5
        //asset detail for particular employee...
        [HttpGet]
        [Route("GetMyAsset/{id}")]
        public IActionResult GetMyAsset(string id)
        {
            try
            {
                List<AssetDetails> list = assetSer.GetAllAssetDetails(id);
                if (list.Count == 0)
                {
                    return NoContent();
                }
                return Ok(list);
            }
            catch (Exception )
            {
                return NotFound();
            }
     
        }
      
    }
}
