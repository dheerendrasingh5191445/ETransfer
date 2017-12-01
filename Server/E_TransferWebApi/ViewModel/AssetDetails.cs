using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.ComponentModel.DataAnnotations;

namespace E_TransferWebApi.Models
{

    public class AssetDetails
    {
        public int AssetId { get; set; }
        public string AssetCode { get; set; }
        public string EmployeeCode { get; set; }
        public string CompanyCode { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public string CapitalisationDate { get; set; }
        [EnumDataType(typeof(Status))]
        [JsonConverter(typeof(StringEnumConverter))]
        public Status AssetStatus { get; set; }
        public string ReAssignedTo { get; set; }
        public string AssignToEmailId { get; set; }
    }
}
