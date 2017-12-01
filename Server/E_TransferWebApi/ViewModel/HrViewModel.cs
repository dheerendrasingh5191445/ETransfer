using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace E_TransferWebApi.Models
{
    public class HrViewModel
    {
        public int RequestId { get; set; }
        public string EmployeeCode { get; set; }
        public string EmployeeName { get; set; }
        public string SupervisorCode { get; set; }
        public string SupervisorName { get; set; }
        public string Oldpacode { get; set; }
        public string Oldpsacode { get; set; }
        public string OldOucode { get; set; }
        public string OldcCode { get; set; }
        public string Newpacode { get; set; }
        public string Newpsacode { get; set; }
        public string NewOucode { get; set; }
        public string NewcCode { get; set; }
        public DateTime DateOfRequest { get; set; }
        public DateTime DateOfTransfer { get; set; } 
    }
}
