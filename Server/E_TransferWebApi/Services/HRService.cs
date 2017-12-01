using E_TransferWebApi.Models;
using E_TransferWebApi.Repository;
using System;
using System.Collections.Generic;

namespace E_TransferWebApi.Services
{
    public interface IHRService
    {
        //Request Methods
        List<HrViewModel> GetAllRequest(string code);

        //Discrepancy Report
        List<DiscrepancyReport> GetAllDiscrepantRecordsList();
    }

    public class HRService : IHRService
    {
        //Repository instances
        readonly IRequestDetailsRepo _requestrepository;
        private readonly IEmployeeDbRepo _niitdb;

        public HRService(IRequestDetailsRepo repo, IEmployeeDbRepo niitdb)
        {
            _requestrepository = repo;
            _niitdb = niitdb;
        }

        //Method to return the requests pending with the HR
        public List<HrViewModel> GetAllRequest(string code)
        {
            List<HrViewModel> requests = new List<HrViewModel>();
            string hrEmployee = _niitdb.GetPsa(code);
            if (hrEmployee != null)
            {
                List<Requests> requestlist = _requestrepository.GetAllRequest(); //repo call
                foreach (Requests req in requestlist)
                {
                    string tempCode = req.EmployeeCode;
                    string reqEmployee = _niitdb.GetPsa(tempCode);
                    if (hrEmployee == reqEmployee)
                    {
                        EmployeeDetails employee = _niitdb.GetOneEmployee(req.EmployeeCode);
                        EmployeeDetails supervisor = _niitdb.GetSupervisor(req.SupervisorCode);
                        HrViewModel model = new HrViewModel();
                        model.DateOfRequest = req.DateOfRequest;
                        model.DateOfTransfer = req.DateOfTransfer;
                        model.EmployeeCode = req.EmployeeCode;
                        model.EmployeeName = employee.EmployeeName;
                        model.NewcCode = req.NewCcCode;
                        model.NewOucode = req.NewOuCode;
                        model.Newpacode = req.NewPaCode;
                        model.Newpsacode = req.NewPsaCode;
                        model.OldcCode = employee.CcCode;
                        model.OldOucode = employee.OuCode;
                        model.Oldpacode = employee.PaCode;
                        model.Oldpsacode = employee.PsaCode;
                        model.RequestId = req.RequestId;
                        model.SupervisorCode = req.SupervisorCode;
                        model.SupervisorName = supervisor.SupervisorName;
                        requests.Add(model);
                    }
                }
            }
            return requests;
        }

        //Method to get all the discrepant records based on the data from the final report generated
        //and the updated data from the SAP
        public List<DiscrepancyReport> GetAllDiscrepantRecordsList()
        {
            List<DiscrepancyReport> discrepancyList = new List<DiscrepancyReport>();
            //repo call to get all the cleared requests
            List<Requests> requestList = _requestrepository.GetAllClearedRequest();///progreess work

            //here the discrepancy for the completed requests are being checked
            foreach (var req in requestList)
            {
                //time difference between the request completion and current date is being checked here
                DateTime date = DateTime.Today;
                TimeSpan difference = date.Date - req.DateOfCompletionRequest.Date;
                if (difference.Days >= 1)
                {
                    //A call to the niit database is being triggered to get a single employee details
                    EmployeeDetails obj = _niitdb.GetOneEmployee(req.EmployeeCode);
                    //check for the discrepant data
                    if (obj.PaCode != req.NewPaCode && obj.PsaCode != req.NewPsaCode &&
                        obj.OuCode != req.NewOuCode && obj.CcCode != req.NewCcCode)
                    {
                        //if discrepancy exists then values are being assigned to the view model
                        DiscrepancyReport report = new DiscrepancyReport();
                        report.EmployeeCode = req.EmployeeCode;
                        report.EmployeeName = req.EmployeeCode;
                        report.RequestCc = req.NewCcCode;
                        report.RequestId = req.RequestId;
                        report.RequestOu = req.NewOuCode;
                        report.RequestPa = req.NewPaCode;
                        report.RequestPsa = req.NewPsaCode;
                        report.SapCc = obj.CcCode + ":" + obj.CcName;
                        report.SapOu = obj.OuCode + ":" + obj.OuName;
                        report.SapPa = obj.PaCode + ":" + obj.PaName;
                        report.SapPsa = obj.PsaCode + ":" + obj.PsaName;

                        discrepancyList.Add(report); //discrepant record are being added to the list to be returned
                    }
                }
            }
            return discrepancyList;
        }
    }
}

