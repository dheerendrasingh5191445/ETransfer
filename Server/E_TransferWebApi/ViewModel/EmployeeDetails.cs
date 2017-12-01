using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace E_TransferWebApi.Models
{
    public class EmployeeDetails
    {
  
        public string EmployeeCode { get; set; }
        public string EmployeeName { get; set; }
        public string EmployeeEmailId { get; set; }
        public string SupervisorEmailId { get; set; }
        public string CompanyCode { get; set; }
        public string PaCode { get; set; }
        public string PaName  { get; set; }
        public string PsaCode { get; set; }
        public string PsaName { get; set; }
        public string OuCode { get; set; }
        public string OuName { get; set; }
        public string CcCode { get; set; }
        public string CcName { get; set; }
        public DateTime DateOfTransfer { get; set; }
        public string SupervisorCode { get;  set; }
        public string SupervisorName { get; set; }
    }
}
