using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using E_TransferWebApi.Models;
using E_TransferWebApi.Repository;

namespace E_TransferWebApi.Services
{

    public interface IAssetDbService
    {
        List<AssetDetails> GetAllAssetDetails(string empCode);

    }
    public class AssetDbService : IAssetDbService
    {
        private IAssetDbRepo _empcontext;
        public AssetDbService(IAssetDbRepo empcontext)
        {
            _empcontext = empcontext;
        }
        //method to fetch the employee's Asset details
        public List<AssetDetails> GetAllAssetDetails(string empCode)
        {
            return _empcontext.GetMyEmployeeAsset(empCode);
        }
    }
}
