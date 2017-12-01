namespace E_TransferWebApi.Models
{
    //feils for the discrepancy report
    public class AssetControllerDiscrepancyReport
    {
        public string AssetCode { get; set; }
        public int RequestId { get; set; }
        public string RepEmployeeCode { get; set; }
        public string RepEmployeeName { get; set; }
        public string SapEmployeeCode { get; set; }
        public string SapEmployeeName { get; set; }      
    }
}
