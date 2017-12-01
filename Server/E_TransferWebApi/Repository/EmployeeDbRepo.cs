
using System;
using E_TransferWebApi.Models;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace E_TransferWebApi.Repository
{
    public interface IEmployeeDbRepo
    {
        List<EmployeeDetails> GetEmployee(string empId);
        EmployeeDetails GetOneEmployee(string empId);
        EmployeeDetails GetSupervisor(string empId);
        EmployeeDetails GetName(string empId);
        string GetPsa(string empId);
        string GetEmail(string empId);
        string GetPA(string empId);
        string GetCso(string pa);
    }

    public class EmployeeDbRepo : IEmployeeDbRepo
    {
        private readonly IConfiguration _config;//intance of interface of config
        ETransferDbContext _context; //instance of interface of master database
        public EmployeeDbRepo(ETransferDbContext _context, IConfiguration _config)
        {
            this._context = _context;
            this._config = _config;
        }

        //this method is establishing connection from database to bring the subordinate of particular employee
        //this is done using empid recieved from frontend
        public List<EmployeeDetails> GetEmployee(string empId)
        {
            List<EmployeeDetails> resultEmployeelist = new List<EmployeeDetails>();
            string cs = _config["ConnectionStrings:NtlniitessConnection"];
            //setting up connection
            SqlConnection con = new SqlConnection(cs);

            SqlCommand cmd = new SqlCommand("SELECT EMPNO,NAME,OU,OUTXT,PSA,PSATXT,PA,PATXT,CO_CODE,CC_CODE,CC_TXT,SUPERVCODE FROM ZEMP_MAST_WEB_AL WHERE SUPERVCODE = @P1");
            cmd.Parameters.AddWithValue("p1",empId);
            cmd.Connection = con;
            try
            {
                con.Open();
                SqlDataReader sdr = cmd.ExecuteReader(CommandBehavior.SingleResult);

                while (sdr.Read())
                {
                    EmployeeDetails req = new EmployeeDetails();
                    req.EmployeeCode = sdr["EMPNO"].ToString();
                    req.EmployeeName = sdr["NAME"].ToString();
                    req.PaCode = sdr["PA"].ToString();
                    req.PaName = sdr["PATXT"].ToString();
                    req.PsaCode = sdr["PSA"].ToString();
                    req.PsaName = sdr["PSATXT"].ToString();
                    req.OuCode = sdr["OU"].ToString();
                    req.OuName = sdr["OUTXT"].ToString();
                    req.CcCode = sdr["CC_CODE"].ToString();
                    req.CcName = sdr["CC_TXT"].ToString();
                    req.CompanyCode = sdr["CO_CODE"].ToString();
                    req.SupervisorCode = sdr["SUPERVCODE"].ToString();
                    resultEmployeelist.Add(req);
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
            //here we return the list
            return resultEmployeelist;
        }
        public EmployeeDetails GetOneEmployee(string empId)
        {
            EmployeeDetails req = new EmployeeDetails();
            string cs = _config["ConnectionStrings:NtlniitessConnection"];
            SqlConnection con = new SqlConnection(cs);
            SqlCommand cmd = new SqlCommand("SELECT EMPNO,NAME,OU,OUTXT,PSA,PSATXT,PA,PATXT,CO_CODE,CC_CODE,CC_TXT,SUPERVCODE,ch_email FROM Zemp_MAST_WEB_AL FULL OUTER JOIN hr_empmaster ON Zemp_MAST_WEB_AL.EMPNO = hr_empmaster.ch_empcode WHERE EMPNO = @P1");
            cmd.Parameters.AddWithValue("P1", empId);
            cmd.Connection = con;
            try
            {
                con.Open();
                SqlDataReader sdr = cmd.ExecuteReader(CommandBehavior.SingleResult);
                while (sdr.Read())
                {
                    req.EmployeeCode = sdr["EMPNO"].ToString();
                    req.EmployeeName = sdr["NAME"].ToString();
                    req.PaCode = sdr["PA"].ToString();
                    req.PaName = sdr["PATXT"].ToString();
                    req.PsaCode = sdr["PSA"].ToString();
                    req.PsaName = sdr["PSATXT"].ToString();
                    req.OuCode = sdr["OU"].ToString();
                    req.OuName = sdr["OUTXT"].ToString();
                    req.CcCode = sdr["CC_CODE"].ToString();
                    req.CcName = sdr["CC_TXT"].ToString();
                    req.CompanyCode = sdr["CO_CODE"].ToString();
                    req.SupervisorCode = sdr["SUPERVCODE"].ToString();
                    req.EmployeeEmailId = sdr["ch_email"].ToString();
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
            return req;
        }

        public EmployeeDetails GetSupervisor(string empId)
        {
            EmployeeDetails req = new EmployeeDetails();
            string cs = _config["ConnectionStrings:NtlniitessConnection"];
            SqlConnection con = new SqlConnection(cs);
            SqlCommand cmd = new SqlCommand("SELECT EMPNO,NAME FROM Zemp_MAST_WEB_AL WHERE EMPNO=@P1");
            cmd.Parameters.AddWithValue("P1", empId);
            cmd.Connection = con;
            try
            {
                con.Open();
                SqlDataReader sdr = cmd.ExecuteReader(CommandBehavior.SingleResult);
                while (sdr.Read())
                {
                    req.EmployeeCode = sdr["EMPNO"].ToString();
                    req.EmployeeName = sdr["NAME"].ToString();
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
            return req;
        }
        public string GetPA(string empId)
        {
            //string psaCode="";
            string cs = _config["ConnectionStrings:NtlniitessConnection"];
            SqlConnection con = new SqlConnection(cs);
            SqlCommand cmd = new SqlCommand("SELECT PA FROM Zemp_MAST_WEB_AL WHERE EMPNO=@P1");
            cmd.Parameters.AddWithValue("P1", empId);
            cmd.Connection = con;
            try
            {
                con.Open();
                SqlDataReader sdr = cmd.ExecuteReader(CommandBehavior.SingleResult);
                while (sdr.Read())
                {
                    string paCode = sdr["PA"].ToString();
                    return paCode;
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
            return null;
        }

        public string GetCso(string pa)
        {
            //string psaCode="";
            string cs = _config["ConnectionStrings:NtlniitessConnection"];
            SqlConnection con = new SqlConnection(cs);
            SqlCommand cmd = new SqlCommand("SELECT DISTINCT ch_empcode FROM ecc_authorization WHERE vc_pa=@P1 AND in_rolecode='9'");
            cmd.Parameters.AddWithValue("P1", pa);
            cmd.Connection = con;
            try
            {
                con.Open();
                SqlDataReader sdr = cmd.ExecuteReader(CommandBehavior.SingleResult);
                while (sdr.Read())
                {
                    string empCode = sdr["ch_empcode"].ToString();
                    return empCode;
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
            return null;
        }


        public string GetPsa(string empId)
        {
            //string psaCode="";
            string cs = _config["ConnectionStrings:NtlniitessConnection"];
            SqlConnection con = new SqlConnection(cs);
            SqlCommand cmd = new SqlCommand("SELECT PSA FROM Zemp_MAST_WEB_AL WHERE EMPNO=@P1");
            cmd.Parameters.AddWithValue("P1", empId);
            cmd.Connection = con;
            try
            {
                con.Open();
                SqlDataReader sdr = cmd.ExecuteReader(CommandBehavior.SingleResult);
                while (sdr.Read())
                {
                    string psaCode = sdr["PSA"].ToString();

                    return psaCode;
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
            return null;
        }



        public EmployeeDetails GetName(string empId)
        {
            EmployeeDetails req = new EmployeeDetails();
            string cs = _config["ConnectionStrings:NtlniitessConnection"];
            SqlConnection con = new SqlConnection(cs);

            SqlCommand cmd = new SqlCommand("SELECT EMPNO,NAME FROM Zemp_MAST_WEB_AL WHERE EMPNO=@P1");
            cmd.Parameters.AddWithValue("P1", empId);
            cmd.Connection = con;
            try
            {
                con.Open();
                SqlDataReader sdr = cmd.ExecuteReader(CommandBehavior.SingleResult);
                while (sdr.Read())
                {
                    req.EmployeeCode = sdr["EMPNO"].ToString();
                    req.EmployeeName = sdr["NAME"].ToString();
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
            return req;
        }



        public string GetEmail(string empId)
        {
            string cs = _config["ConnectionStrings:NtlniitessConnection"];
            SqlConnection con = new SqlConnection(cs);
            SqlCommand cmd = new SqlCommand("SELECT ch_email FROM hr_empmaster WHERE ch_empcode=@P1");
            cmd.Parameters.AddWithValue("P1", empId);
            cmd.Connection = con;
            try
            {
                con.Open();
                SqlDataReader sdr = cmd.ExecuteReader(CommandBehavior.SingleResult);
                while (sdr.Read())
                {
                    string emailId = sdr["ch_email"].ToString();

                    return emailId;
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
            return null;
        }
    }
}
