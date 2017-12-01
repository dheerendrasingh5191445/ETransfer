using E_TransferWebApi.Models;
using E_TransferWebApi.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.CodeAnalysis.Semantics;

namespace E_TransferWebApi.Services
{

    public interface IAssetAssignedUserService
    {
        List<AssetDetails> GetAssetListByEmpcode(string code);
        bool UpdateAssetStatus(int id, Assets asset);
        List<AssetDetails> GetAcceptedAssetsByEmpCode(string id);

    }
    public class AssetAssignedUserService : IAssetAssignedUserService
    {
        IAssetDetailsRepo _repo;
        private IAssetDbRepo _assetRepo;
        public AssetAssignedUserService(IAssetDetailsRepo repo,IAssetDbRepo assetRepo)
        {
            _repo = repo;
            _assetRepo = assetRepo;
        }
        public List<AssetDetails> GetAssetListByEmpcode(string code)
        {
            List<AssetDetails> assetlist = new List<AssetDetails>();
            List<Assets> assets = _repo.GetAllAsset();
            foreach (Assets asset in assets)
            {   
                string[] empId = asset.ReassignedTo.Split(':');
                if (empId[0] == code && asset.AssetStatus == Status.Pending)
                {
                    List<AssetDetails> assetdetail = _assetRepo.GetMyEmployeeAsset(asset.EmployeeCode);
                    foreach (var assetd in assetdetail)
                    {
                        if (assetd.AssetCode == asset.AssetCode)
                        {
                            assetd.ReAssignedTo = asset.ReassignedTo;
                            assetd.AssetId = asset.AssetId;
                            assetlist.Add(assetd);
                        }
                    } 
                 
                }
            }
            return assetlist;
        }

        public bool UpdateAssetStatus(int id, Assets asset)
        {
            if (asset.AssetStatus == Status.Accepted)
            {
                asset.DateOfAcceptance = DateTime.Now;
                _repo.EditAssetonAssignedUserResponse(id, asset);
                return true;
            }
            _repo.EditAssetonAssignedUserResponse(id, asset);
            return true;

        }
        public List<AssetDetails> GetAcceptedAssetsByEmpCode(string empid)
        {
            List<AssetDetails> assetlist = new List<AssetDetails>();
            List<Assets> assets = _repo.GetAllAsset();
            foreach (Assets asset in assets)
            {
                string[] empId = asset.ReassignedTo.Split(':');
                if (empId[0] == empid  && asset.AssetStatus == Status.Accepted)
                {
                    List<AssetDetails> assetdetail = _assetRepo.GetMyEmployeeAsset(asset.EmployeeCode);
                    foreach (var assetd in assetdetail)
                    {
                        if (assetd.AssetCode == asset.AssetCode)
                        {
                            assetd.ReAssignedTo = asset.ReassignedTo;
                            assetd.AssetId = asset.AssetId;
                            assetlist.Add(assetd);
                        }
                    }

                }
            }
            return assetlist;
        }
    }
}