using E_TransferWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using E_TransferWebApi.Repository;

namespace E_TransferWebApi.Services
{
    public interface IEmpDbService
    {
        List<EmployeeDetails> GetAllSubOrdinates(string empCode);
        EmployeeDetails GetOneEmp(string empCode);
    }
    public class EmpDbService:IEmpDbService
    {
        private IEmployeeDbRepo _empcontext;
        public EmpDbService(IEmployeeDbRepo empcontext)
        {
                _empcontext = empcontext;      
        }
        //method to fetch the employee's subordinate
        public List<EmployeeDetails> GetAllSubOrdinates(string empCode)
        {         
                return _empcontext.GetEmployee(empCode);               
        }

        public EmployeeDetails GetOneEmp(string empCode)
        {
            return _empcontext.GetOneEmployee(empCode);
        }
    }
}
