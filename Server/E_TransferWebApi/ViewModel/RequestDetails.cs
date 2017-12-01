using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace E_TransferWebApi.Models
{

    public class RequestDetails
    {
        public int RequestId { get; set; }
        public string EmployeeCode { get; set; }
        public string EmployeeName { get; set; }
        public string SupervisorCode { get; set; }
        public string SupervisorName { get; set; }
        public string TypeOfRequest { get; set; }
        public string Newpacode { get; set; }
        public string Newpsacode { get; set; }
        public string NewOucode { get; set; }
        public string NewCcCode { get; set; }
        [EnumDataType(typeof(RequestStatus))]
        [JsonConverter(typeof(StringEnumConverter))]
        public RequestStatus RequestStatus { get; set; }
        [EnumDataType(typeof(PendingWith))]
        [JsonConverter(typeof(StringEnumConverter))]
        public PendingWith pendingWith { get; set; }
        public DateTime DateOfTransfer { get; set; }
        public DateTime DateOfRequest { get; set; }
        public DateTime DateOfCompletionRequest { get; set; }
    }
}