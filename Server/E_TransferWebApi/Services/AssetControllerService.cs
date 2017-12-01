using E_TransferWebApi.Models;
using E_TransferWebApi.Repository;
using System;
using System.Collections.Generic;

namespace E_TransferWebApi.Services
{
    public interface IAssetControllerService
    {
        List<Assets> GetAssetDetailsByEmpcode(string code);
        List<AssetDetails> GetRequestStatus();
        List<AssetControllerDiscrepancyReport> GetDiscrepantRecords();
    }
    public class AssetControllerService : IAssetControllerService
    {
        private IAssetDetailsRepo _assetrepo;
        private IRequestDetailsRepo _requestrepo;
        private IAssetDbRepo _assetDb;
        private IEmployeeDbRepo _empDb;
        public AssetControllerService(IAssetDetailsRepo assetrepo, IRequestDetailsRepo requestrepo, IAssetDbRepo assetDb , IEmployeeDbRepo empdb)
        {
            _assetrepo = assetrepo;
            _requestrepo = requestrepo;
            _assetDb = assetDb;
            _empDb = empdb;
        }
        //Method to get the assets according to the employee code
        public List<Assets> GetAssetDetailsByEmpcode(string code)
        {
            return _assetrepo.GetAssetByEmpCode(code); //repo call
        }
        //Method to get all the discrepant asset records based on the data from the final report generated
        //and the updated data from the SAP
        public List<AssetControllerDiscrepancyReport> GetDiscrepantRecords()
        {
            List<AssetControllerDiscrepancyReport> discrepancyList = new List<AssetControllerDiscrepancyReport>();
            //Repository method to get all the cleared request
            List<Requests> requestList = _requestrepo.GetAllClearedRequest();
            foreach (var req in requestList)
            {
                //time difference between the request completion and current date is being checked here
                DateTime date = DateTime.Today;
                TimeSpan difference = date.Date - req.DateOfCompletionRequest.Date;
                if (difference.Days >= 1)
                {
                    //Repository method to get all the asset associated to a employee 
                    List<Assets> assetList = _assetrepo.GetAssetByEmpCode(req.EmployeeCode);
                    foreach (var asset in assetList)
                    {
                        //A call to the niit database is being triggered to get a single asset details
                        AssetDetails assetSAP = _assetDb.GetAssetByCode(asset.AssetCode);
                        string[] empId = asset.ReassignedTo.Split(':');
                        if (assetSAP.EmployeeCode != empId[0])
                        {
                            EmployeeDetails emp = _empDb.GetName(empId[0]);
                            EmployeeDetails emp2 = _empDb.GetName(assetSAP.EmployeeCode);
                            //if discrepancy exists then values are being assigned to the view model
                            AssetControllerDiscrepancyReport report = new AssetControllerDiscrepancyReport();
                            report.RequestId = req.RequestId;
                            report.AssetCode = asset.AssetCode;
                            report.RepEmployeeCode = asset.ReassignedTo;
                            report.RepEmployeeName = emp.EmployeeName;
                            report.SapEmployeeCode = assetSAP.EmployeeCode;
                            report.SapEmployeeName = emp2.EmployeeName;
                            discrepancyList.Add(report); //discrepant record are being added to the list to be returned
                        }
                    }
                }
            }
            return discrepancyList;
        }
        //Method to get the assets approved by the cso and displaying them to the Asset Contoller as a report
        public List<AssetDetails> GetRequestStatus()
        {
            List<AssetDetails> assetControlList = new List<AssetDetails>();
            List<Requests> requestClear = new List<Requests>();
            List<Requests> requests = _requestrepo.GetAllRequest(); //repo call
            foreach (Requests request in requests)
            {
                //logic for getting the cleared request
                if (request.RequestStatus == RequestStatus.Completed && request.PendingWith == PendingWith.Approved)
                {
                    requestClear.Add(request);
                }
            }
            //getting assets of a particular employee
            foreach (Requests req in requestClear)
            {
                List<Assets> assets = new List<Assets>();
                assets = GetAssetDetailsByEmpcode(req.EmployeeCode); //service call
                foreach (Assets req1 in assets)
                {
                    AssetDetails asset = _assetDb.GetAssetByCode(req1.AssetCode); //repo call
                    //setting the details to the view model
                    AssetDetails final = new AssetDetails();
                    final.AssetId = req1.AssetId;
                    final.AssetCode = req1.AssetCode;
                    final.AssetStatus = req1.AssetStatus;
                    final.ReAssignedTo = req1.ReassignedTo;
                    final.CompanyCode = asset.CompanyCode;
                    final.CapitalisationDate = asset.CapitalisationDate;
                    final.Location = asset.Location;
                    final.Description = asset.Description;
                    assetControlList.Add(final); //adding to the list to be returned
                }
            }
            return assetControlList;
        }
    }
}
