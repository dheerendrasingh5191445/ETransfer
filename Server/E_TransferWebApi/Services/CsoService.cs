using E_TransferWebApi.Models;
using E_TransferWebApi.Repository;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;
using MimeKit;
using System;
using System.Collections.Generic;
namespace E_TransferWebApi.Services
{
    public interface ICsoService
    {
        List<RequestDetails> GetRequestPendingWithCso(string code);
        List<RequestDetails> GetRequestApprovedByCso(string code);
        bool UpdateRequest(int id, RequestDetails request);
        List<AssetDetails> GetAssetDetailsByEmpcode(string id);
        void EmailbyCso(string id, RequestDetails requestData);
    }
    public class CsoService : ICsoService
    {
        private IRequestDetailsRepo _repo;
        private IAssetDetailsRepo _assetRepo;
        private IEmployeeDbRepo _empDetails;
        private IAssetDbRepo _assetDb;
        public CsoService(IRequestDetailsRepo repo, IAssetDetailsRepo assetRepo, IEmployeeDbRepo niitDb, IAssetDbRepo assetDb)
        {
            _repo = repo;
            _assetRepo = assetRepo;
            _empDetails = niitDb;
            _assetDb = assetDb;
            var builder = new ConfigurationBuilder() //config file for the email method
            .AddJsonFile("config.json", optional: false, reloadOnChange: true);
            Configuration = builder.Build();// config file for email id
        }
        public IConfigurationRoot Configuration { get; }
        public List<RequestDetails> GetRequestPendingWithCso(string code)
        {
            List<RequestDetails> requests = new List<RequestDetails>();
            List<EmployeeDetails> emps = new List<EmployeeDetails>();
            //get only those requests that are pending with cso 
            List<Requests> requestList = _repo.GetAllCsoRequest();

            string employeeCso = code;
            foreach (Requests req in requestList)
            {
                string pa = _empDetails.GetPA(req.EmployeeCode);
                string locationCso = _empDetails.GetCso(pa);


                if (employeeCso == locationCso)
                {
                    List<Assets> assetList = _assetRepo.GetAssetByEmpCode(req.EmployeeCode);
                    List<Assets> assets = _assetRepo.GetAssetsByCso(req.EmployeeCode);
                    if (assets.Count == assetList.Count)
                    {
                        //get the employer name with the corresponding request id 
                        EmployeeDetails empName = _empDetails.GetOneEmployee(req.EmployeeCode);
                        EmployeeDetails supName = _empDetails.GetSupervisor(req.SupervisorCode);
                        RequestDetails model = new RequestDetails();
                        model.DateOfRequest = req.DateOfRequest;
                        model.EmployeeCode = req.EmployeeCode;
                        model.EmployeeName = empName.EmployeeName;
                        model.SupervisorCode = req.SupervisorCode;
                        model.SupervisorName = supName.SupervisorName;
                        model.Newpacode = req.NewPaCode;
                        model.Newpsacode = req.NewPsaCode;
                        model.NewOucode = req.NewOuCode;
                        model.NewCcCode = req.NewCcCode;
                        model.RequestStatus = req.RequestStatus;
                        model.TypeOfRequest = req.TypeOfRequest;
                        model.pendingWith = req.PendingWith;
                        model.RequestId = req.RequestId;
                        model.DateOfTransfer = req.DateOfTransfer;
                        model.DateOfCompletionRequest = req.DateOfCompletionRequest;
                        requests.Add(model); //add the requests to the view model


                    }
                }
            }
            return requests;
        }
        public List<RequestDetails> GetRequestApprovedByCso(string code)
        {//implementation in progreeesssss
            List<Requests> requestList = _repo.GetAllClearedRequest();
            List<RequestDetails> requests = new List<RequestDetails>();
            foreach (Requests req in requestList)
            {
                //get the approved list of request by cso
                EmployeeDetails empName = _empDetails.GetOneEmployee(req.EmployeeCode);
                EmployeeDetails supName = _empDetails.GetSupervisor(req.SupervisorCode);
                RequestDetails model = new RequestDetails();
                model.DateOfRequest = req.DateOfRequest;
                model.EmployeeCode = req.EmployeeCode;
                model.EmployeeName = empName.EmployeeName;
                model.SupervisorCode = req.SupervisorCode;
                model.SupervisorName = supName.SupervisorName;
                model.Newpacode = req.NewPaCode;
                model.Newpsacode = req.NewPsaCode;
                model.NewOucode = req.NewOuCode;
                model.NewCcCode = req.NewCcCode;
                model.RequestStatus = req.RequestStatus;
                model.RequestId = req.RequestId;
                model.TypeOfRequest = req.TypeOfRequest;
                model.pendingWith = req.PendingWith;
                model.DateOfTransfer = req.DateOfTransfer;
                model.DateOfCompletionRequest = req.DateOfCompletionRequest;
                requests.Add(model);
            }
            return requests;
        }
        public bool UpdateRequest(int id, RequestDetails request)
        {
            try
            {
                Requests req = _repo.GetOneCsoRequest(request.RequestId);
                _repo.EditRequestByCso(id, req);  //update the request to cleared
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public List<AssetDetails> GetAssetDetailsByEmpcode(string id)
        {
            List<AssetDetails> assetCsoList = new List<AssetDetails>();
            List<Requests> requestClear = _repo.GetAllCsoRequest();
            //getting assets of a particular employee
            foreach (Requests req in requestClear)
            {
                List<Assets> assets = _assetRepo.GetAssetsByCso(req.EmployeeCode);
                foreach (Assets req1 in assets)
                {
                    AssetDetails asset = _assetDb.GetAssetByCode(req1.AssetCode); //repo call
                    //setting the details to the view model
                    AssetDetails model = new AssetDetails();
                    model.AssetId = req1.AssetId;
                    model.AssetCode = req1.AssetCode;
                    model.AssetStatus = req1.AssetStatus;
                    model.ReAssignedTo = req1.ReassignedTo;
                    model.CompanyCode = asset.CompanyCode;
                    model.CapitalisationDate = asset.CapitalisationDate;
                    model.Location = asset.Location;
                    model.Description = asset.Description;
                    assetCsoList.Add(model); //adding to the list to be returned
                }
            }
            return assetCsoList;
        }
        public void EmailbyCso(string id, RequestDetails requestData)
        {
            //send email to the employers that cso clearance is done.
            string email = _empDetails.GetOneEmployee(requestData.EmployeeCode).EmployeeEmailId;
            string name = _empDetails.GetOneEmployee(requestData.EmployeeCode).EmployeeName;
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(Configuration["Title"], Configuration["FromEmail"]));
            message.To.Add(new MailboxAddress(name, email));
            message.Subject = Configuration["SubjectForCSOApproval"];
            var bodyBuilder = new BodyBuilder();
            //body of the mail
            bodyBuilder.HtmlBody = @"<div>  Dear Sir/Madam</div><br><br><div>Your Request has been cleared by CSO Department for Asset Clearance</div><br><br><div> Cso Department</div>";
            message.Body = bodyBuilder.ToMessageBody();
            using (var client = new SmtpClient())
            {
                client.Connect(Configuration["Domain"], 587, false);
                client.Authenticate(Configuration["FromEmail"], Configuration["Password"]);
                client.Send(message);
                client.Disconnect(true);
            }

        }
    }
}
