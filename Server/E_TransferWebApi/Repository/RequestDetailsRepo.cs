using E_TransferWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace E_TransferWebApi.Repository
{
    public interface IRequestDetailsRepo
    {
        bool AddRequest(Requests request);
        bool EditRequest(int id, Requests request);
        void EditRequestByHr(int id, Requests request);
        void DeleteRequest(int id);
        List<Requests> GetAllRequest();
        List<Requests> GetAllClearedRequest();
        List<Requests> GetAllCsoRequest();
        Requests GetRequestByEmpcode(string code);
        void EditRequestByCso(int id, Requests request);
        Requests GetOneCsoRequest(int code);
    }
    public class RequestDetailsRepo : IRequestDetailsRepo
    {
        ETransferDbContext _context;
        public RequestDetailsRepo(ETransferDbContext context)
        {
            _context = context;
        }
        public bool AddRequest(Requests request)
        {
            try
            {
                _context.ETransferRequests.Add(request);
                _context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }
        public void DeleteRequest(int id)
        {
            Requests request = _context.ETransferRequests.FirstOrDefault(m => m.RequestId == id);
            _context.ETransferRequests.Remove(request);
            _context.SaveChanges();
        }
        public bool EditRequest(int id, Requests request)
        {
            try
            {
                Requests currentrequest = _context.ETransferRequests.FirstOrDefault(m => m.RequestId == id);
                currentrequest.NewCcCode = request.NewCcCode;
                currentrequest.NewOuCode = request.NewOuCode;
                currentrequest.NewPaCode = request.NewPaCode;
                currentrequest.NewPsaCode = request.NewPsaCode;
                currentrequest.PendingWith = request.PendingWith;
                currentrequest.TypeOfRequest = request.TypeOfRequest;
                _context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public void EditRequestByHr(int id, Requests request)
        {
            Requests currentrequest = _context.ETransferRequests.FirstOrDefault(m => m.RequestId == id);
            currentrequest.PendingWith = request.PendingWith;
            _context.SaveChanges();
        }

        public List<Requests> GetAllRequest()
        {
            return _context.ETransferRequests.ToList();
        }

        public Requests GetRequestByEmpcode(string code)
        {
            Requests request = _context.ETransferRequests.FirstOrDefault(m => m.EmployeeCode == code);
            return request;
        }

        
        public void EditRequestByCso(int id, Requests request)
        {
            Requests currentrequest = _context.ETransferRequests.FirstOrDefault(m => m.RequestId == id);
            currentrequest.PendingWith = request.PendingWith;
            currentrequest.RequestStatus = request.RequestStatus;
            currentrequest.DateOfCompletionRequest = request.DateOfCompletionRequest;
            _context.SaveChanges();
        }

        public List<Requests> GetAllClearedRequest()
        {
            return _context.ETransferRequests.Where(x => x.RequestStatus == RequestStatus.Completed).ToList();
        }
        public List<Requests> GetAllCsoRequest()
        {
            return _context.ETransferRequests.Where(x => x.RequestStatus == RequestStatus.Pending && x.PendingWith == PendingWith.CSO).ToList();
        }
        public Requests GetOneCsoRequest(int code)
        {
            Requests request = _context.ETransferRequests.FirstOrDefault(m => m.RequestId == code);
            return request;
        }

    }
}
