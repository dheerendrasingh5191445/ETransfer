using E_TransferWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace E_TransferWebApi.Repository
{
        public interface IAssetDetailsRepo
        {
            bool AddAsset(Assets asset);
            bool EditAsset(int id, Assets asset);
            void DeleteAsset(int id);
            List<Assets> GetAcceptedAssetsByEmpCode(string empid);
            List<Assets> GetAllAsset();
            List<Assets> GetAssetByEmpCode(string id);
            List<Assets> GetAssetsByCso(string id);
            void EditAssetonAssignedUserResponse(int id, Assets asset);
        }
        public class AssetDetailsRepo : IAssetDetailsRepo
        {
            ETransferDbContext _context;
            public AssetDetailsRepo(ETransferDbContext _context)
            {
                this._context = _context;
            }
        public bool AddAsset(Assets asset)
        {
            try
            {
                _context.ETransferAssets.Add(asset);
                _context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }
        public void DeleteAsset(int id)
            {
                Assets asset = _context.ETransferAssets.FirstOrDefault(m => m.AssetCode == id.ToString());
                _context.ETransferAssets.Remove(asset);
                _context.SaveChanges();
            }
            public bool EditAsset(int id, Assets asset)
            {
            try
            {
                Assets currentasset = _context.ETransferAssets.FirstOrDefault(m => m.AssetId == id);
                currentasset.ReassignedTo = asset.ReassignedTo;
                currentasset.AssetStatus = asset.AssetStatus;
                _context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }
            public List<Assets> GetAllAsset()
            {
                return _context.ETransferAssets.ToList();
            }
        public void EditAssetonAssignedUserResponse(int id, Assets asset)
        {
            Assets currentasset = _context.ETransferAssets.FirstOrDefault(m => m.AssetId == id);
            currentasset.AssetStatus = asset.AssetStatus;
            _context.SaveChanges();
        }

            public List<Assets> GetAcceptedAssetsByEmpCode(string empid)
            {

                List<Assets> assets = _context.ETransferAssets.Where(x => x.ReassignedTo == empid && x.AssetStatus == Status.Accepted).ToList();
                return assets;
            }
        public List<Assets> GetAssetByEmpCode(string id)
            {
            
                List<Assets> assets = _context.ETransferAssets.Where(x => x.EmployeeCode == id).ToList();
                return assets;
            }
            public List<Assets> GetAssetsByCso(string id)
            {
                List<Assets> assets = _context.ETransferAssets.Where(x => x.EmployeeCode == id && x.AssetStatus == Status.Accepted).ToList();
                return assets;
            }
    }
    
}
