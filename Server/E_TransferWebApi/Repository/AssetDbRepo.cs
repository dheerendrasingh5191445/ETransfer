using E_TransferWebApi.Models;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace E_TransferWebApi.Repository
{
    public interface IAssetDbRepo
    {
        List<AssetDetails> GetMyEmployeeAsset(string empId );
        AssetDetails GetAssetByCode(string code);
    }
    public class AssetDbRepo:IAssetDbRepo
    {
        private readonly IConfiguration _config;
        ETransferDbContext _context;
        public AssetDbRepo(ETransferDbContext _context,IConfiguration _config)
        {
            this._context = _context;
            this._config = _config;
        }

        public List<AssetDetails> GetMyEmployeeAsset(string empId)
        {
            List<AssetDetails> resultAssetlist = new List<AssetDetails>();
            //getting connection
            string cs = _config["ConnectionStrings:NtlniitessConnection"];
            SqlConnection con = new SqlConnection(cs);
            SqlCommand cmd = new SqlCommand();
            cmd.Parameters.AddWithValue("p1", empId);
            cmd.CommandText = "SELECT PERNR AS EmpCode, ANLN1 AS AssetCode, BUKRS AS CompanyCode, TXT50 AS AssetDesc,CASE WHEN AKTIV = '00000000' THEN '' ELSE AKTIV END AS CapitalizationDate,STORT AS Location, STTEXT AS LocationTxt,ORD42TEXT AS StatusTxt FROM ZASSETFORWEB WHERE PERNR = @P1 AND ANLN2 = '0000' ";
            cmd.Connection = con;
            try
            {
                con.Open();
                SqlDataReader sdr = cmd.ExecuteReader(CommandBehavior.SingleResult);

                while (sdr.Read())
                {
                    AssetDetails ass = new AssetDetails();
                    ass.AssetCode = sdr["AssetCode"].ToString();
                    ass.EmployeeCode = sdr["EmpCode"].ToString();
                    ass.CompanyCode = sdr["CompanyCode"].ToString();
                    ass.Description = sdr["AssetDesc"].ToString();
                    ass.CapitalisationDate = sdr["CapitalizationDate"].ToString();
                    string str1 = sdr["Location"].ToString();
                    string str2 = sdr["LocationTxt"].ToString();
                    ass.Location = str1 + str2;
                    resultAssetlist.Add(ass);
                }
            }
            catch (SqlException ex)
            {
                throw ex;
            }
            finally
            {
                con.Close();
            }
            return resultAssetlist;
        }

        public AssetDetails GetAssetByCode(string code)
        {
            AssetDetails resultAssetlist = new AssetDetails();
            string cs = _config["ConnectionStrings:NtlniitessConnection"];
            SqlConnection con = new SqlConnection(cs);
            SqlCommand cmd = new SqlCommand();
            cmd.Parameters.AddWithValue("P1", code);
            cmd.CommandText = "SELECT PERNR AS EmpCode, ANLN1 AS AssetCode, BUKRS AS CompanyCode, TXT50 AS AssetDesc,CASE WHEN AKTIV = '00000000' THEN '' ELSE AKTIV END AS CapitalizationDate,STORT AS Location, STTEXT AS LocationTxt,ORD42TEXT AS StatusTxt FROM ZASSETFORWEB WHERE ANLN1 = @P1 AND ANLN2 = '0000' ";
            cmd.Connection = con;
            try
            {
                con.Open();
                SqlDataReader sdr = cmd.ExecuteReader(CommandBehavior.SingleResult);

                while (sdr.Read())
                {
                    resultAssetlist.AssetCode = sdr["AssetCode"].ToString();
                    resultAssetlist.EmployeeCode = sdr["EmpCode"].ToString();
                    resultAssetlist.CompanyCode = sdr["CompanyCode"].ToString();
                    resultAssetlist.Description = sdr["AssetDesc"].ToString();
                    resultAssetlist.CapitalisationDate = sdr["CapitalizationDate"].ToString();
                    string str1 = sdr["Location"].ToString();
                    string str2 = sdr["LocationTxt"].ToString();
                    resultAssetlist.Location = str1 + str2;
                }
            }
            catch (SqlException ex)
            {
                throw ex;
            }
            finally
            {
                con.Close();
            }
            return resultAssetlist;
        }
    }
}

