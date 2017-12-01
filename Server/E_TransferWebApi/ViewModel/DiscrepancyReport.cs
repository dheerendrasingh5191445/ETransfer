using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace E_TransferWebApi.Models
{
    public class DiscrepancyReport
    {
        public int RequestId { get; set; }
        public string EmployeeCode { get; set; }
        public string EmployeeName { get; set; }
        public string RequestPa { get; set; }
        public string RequestPsa { get; set; }
        public string RequestOu { get; set; }
        public string RequestCc { get; set; }
        public string SapPa { get; set; }
        public string SapPsa { get; set; }
        public string SapOu { get; set; }
        public string SapCc { get; set; }
    }
}
