using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace E_TransferWebApi.Models
{
    public enum Status
    {
        Pending,
        Accepted,
        Rejected
    }
    public class Assets
    {
        [Key]
        public int AssetId { get; set; }
        public string AssetCode { get; set; }
        [ForeignKey("EmployeeCode")]
        public string EmployeeCode { get; set; }
        public Requests Requests { get; set; }
        public DateTime DateOfAcceptance { get; set; }
        public string ReassignedTo { get; set; }
        [EnumDataType(typeof(Status))]
        [JsonConverter(typeof(StringEnumConverter))]
        public Status AssetStatus { get; set; }
    }
}
