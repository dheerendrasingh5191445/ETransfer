using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace E_TransferWebApi.Models
{
    public enum RequestStatus
    {
        Completed,
        Pending
    }
    public enum PendingWith
    {
        Supervisor,
        CSO,
        Approved
    }
    public class Requests
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string EmployeeCode { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RequestId { get; set; }
        public string SupervisorCode { get; set; }
        public string TypeOfRequest { get; set; }
        public string NewPaCode { get; set; }
        public string NewPsaCode { get; set; }
        public string NewOuCode { get; set; }
        public string NewCcCode { get; set; }
        public DateTime DateOfTransfer { get; set; }
        public DateTime DateOfRequest { get; set; }
        public DateTime DateOfCompletionRequest { get; set; }          
        [EnumDataType(typeof(RequestStatus))]
        [JsonConverter(typeof(StringEnumConverter))]
        public RequestStatus RequestStatus { get; set; }
        [EnumDataType(typeof(PendingWith))]
        [JsonConverter(typeof(StringEnumConverter))]
        public PendingWith PendingWith { get; set; }
    }
}
