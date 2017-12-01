using E_TransferWebApi.Models;
using E_TransferWebApi.Repository;

namespace E_TransferWebApi.Services
{
    public interface IUserService
    {
        EmployeeDetails GetUserDetails(string id);
        RequestDetails GetUserByEmpcode(string code);
    }
    public class UserService : IUserService
    {
        private IEmployeeDbRepo _empRepo;
        private IRequestDetailsRepo _reqRepo;

        public UserService(IEmployeeDbRepo empRepo, IRequestDetailsRepo reqRepo)
        {
            _empRepo = empRepo;
            _reqRepo = reqRepo;
        }

        //Method for getting request details for particular employee code
        public RequestDetails GetUserByEmpcode(string code)
        {
            //Details
            Requests req = _reqRepo.GetRequestByEmpcode(code);
            EmployeeDetails empName = _empRepo.GetOneEmployee(req.EmployeeCode);
            EmployeeDetails supName = _empRepo.GetSupervisor(req.SupervisorCode);
            RequestDetails model = new RequestDetails();
            model.DateOfRequest = req.DateOfRequest;
            model.EmployeeCode = req.EmployeeCode;
            model.EmployeeName = empName.EmployeeName;
            model.SupervisorCode = empName.SupervisorCode;
            model.SupervisorName = supName.SupervisorName;
            model.Newpacode = req.NewPaCode;
            model.Newpsacode = req.NewPsaCode;
            model.NewOucode = req.NewOuCode;
            model.NewCcCode = req.NewCcCode;
            model.RequestStatus = req.RequestStatus;
            model.TypeOfRequest = req.TypeOfRequest;
            model.pendingWith = req.PendingWith;
            model.DateOfTransfer = req.DateOfTransfer;
            model.DateOfCompletionRequest = req.DateOfCompletionRequest;
            return model;
        }

        //Method for getting Employee details for particular Id
        public EmployeeDetails GetUserDetails(string id)
        {
            return _empRepo.GetOneEmployee(id);
        }
    }
}