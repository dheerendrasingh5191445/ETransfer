using E_TransferWebApi.Models;
using E_TransferWebApi.Repository;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace E_TransferWebApi.Services
{
    public interface ISupervisorService
    {
        //Request Methods
        List<Requests> GetAllpendingRequest();
        bool AddRequest(Requests request);
        bool EditRequest(int id, Requests request);
        List<Requests> GetRequestById(string id);
       
        //Asset methods
        bool AddAsset(List<Assets> assetlist);
        List<AssetDetails> GetRejectedAssetListByEmpCode(List<string> asset);
        bool EditAssetById(int id, Assets assetlist);
        List<Assets> Getasset();

    }
    public class SupervisorService : ISupervisorService
    {
        IRequestDetailsRepo _requestrepository;
        IAssetDetailsRepo _assetrepo;
        IAssetDbRepo _assetDbRepo;
        public SupervisorService(IRequestDetailsRepo request, IAssetDetailsRepo asset, IAssetDbRepo assetDbRepo)
        {
            _requestrepository = request;
            _assetrepo = asset;
            _assetDbRepo = assetDbRepo;
        }

        public bool AddAsset(List<Assets> assetlist)
        {
               bool check = false;
                foreach (Assets asset in assetlist)
                {
                    check = _assetrepo.AddAsset(asset);
                }
            return check;
        }

        public bool AddRequest(Requests request)
        {
            
               request.DateOfRequest = DateTime.Now;
               bool check = _requestrepository.AddRequest(request);
               return check;

        }

        public void DeleteRequest(int id)
        {
            _requestrepository.DeleteRequest(id);
        }

        public bool EditAssetById(int id, Assets assetlist)
        {           
              bool check =_assetrepo.EditAsset(id, assetlist);
            return check;
        }

        public bool EditRequest(int id, Requests request)
        {
            bool check = _requestrepository.EditRequest(id, request);
            return check;
        }

        public List<AssetDetails> GetRejectedAssetListByEmpCode(List<string> asset)
        {
            List<AssetDetails> rejectedassetlist = new List<AssetDetails>();
            foreach (string empid in asset)
            {
                List<AssetDetails> assetdetail = _assetDbRepo.GetMyEmployeeAsset(empid);
                List<Assets> matchassets = _assetrepo.GetAssetByEmpCode(empid);
                foreach (Assets myasset in matchassets)
                {
                    foreach (AssetDetails assdet in assetdetail)
                    {   if(assdet.AssetCode == myasset.AssetCode && assdet.EmployeeCode == myasset.EmployeeCode)
                        
                        if (myasset.AssetStatus == Status.Rejected)
                        {
                            assdet.ReAssignedTo = myasset.ReassignedTo;
                            assdet.AssetId = myasset.AssetId;
                            rejectedassetlist.Add(assdet);
                        }
                    }
                }
            }
            return rejectedassetlist;
        }

        public List<Requests> GetAllpendingRequest()
        {
            List<Requests> requestlist = new List<Requests>();
            List<Requests> request = _requestrepository.GetAllRequest();
            foreach (Requests req in request)
            {
                if (req.PendingWith == PendingWith.Supervisor)
                {
                    requestlist.Add(req);
                }
            }
            return requestlist;
        }

        public List<Assets> Getasset()
        {
            return _assetrepo.GetAllAsset();
        }

        public List<Requests> GetRequestById(string id)
        {
            List<Requests> ReqList = new List<Requests>();
            List<Requests> TempList=_requestrepository.GetAllRequest();
            foreach (var temp in TempList)
            {
                if (temp.SupervisorCode == id)
                {
                  ReqList.Add(temp);  
                }
            }
            return ReqList;
        }
    }
}
