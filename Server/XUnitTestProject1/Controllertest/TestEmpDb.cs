using System;
using E_TransferWebApi.Services;
using Xunit;
using Moq;
using System.Collections.Generic;
using E_TransferWebApi.Controllers;
using E_TransferWebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace XUnitTestProject1
{
    public class TestEmpDb
    {
        [Fact]
        public void TestEmpDatabaseIsReturningCorrectResult()
        {
            //Arrange
                string id = "123";
                var mockService = new Mock<IEmpDbService>();
                List<EmployeeDetails> EmpDetailList=new List<EmployeeDetails>();
                EmpDetailList.Add(new EmployeeDetails()
                {
                    EmployeeCode = "122",CcCode = "213",CcName = "safcsa",CompanyCode = "safdas",DateOfTransfer = DateTime.Now,
                    EmployeeEmailId = "dheerf",EmployeeName = "safsgdsg",OuCode = "123",OuName = "dsajhfkdsj"                    
                });
                mockService.Setup(x => x.GetAllSubOrdinates(id)).Returns(EmpDetailList);
                EmpDatabaseController obj = new EmpDatabaseController(mockService.Object);

                //Act
                var result = (OkObjectResult)obj.GetMyEmployee(id);

                //Assert
                Assert.Equal(200, result.StatusCode);

        }
        [Fact]
        public void TestEmpDatabaseContentNotFoundInList()
        {
            //Arrange
            string id = "123";
            var mockService = new Mock<IEmpDbService>();
            List<EmployeeDetails> EmpDetail= new List<EmployeeDetails>();
          
            mockService.Setup(x => x.GetAllSubOrdinates(id)).Returns(EmpDetail);
            EmpDatabaseController obj = new EmpDatabaseController(mockService.Object);

            //Act
            var Result = obj.GetMyEmployee(id) as StatusCodeResult;
            //var ResultCode = (StatusCodeResult) Result;

            //Assert
            Assert.Equal(204,Result.StatusCode);

        }
        [Fact]
        public void TestEmpDatabasethrowsexception()
        {
            //Arrange
            string id = "123";
            var mockService = new Mock<IEmpDbService>();
            mockService.Setup(x => x.GetAllSubOrdinates(id)).Throws(new Exception());
            EmpDatabaseController obj = new EmpDatabaseController(mockService.Object);

            //Act
            var Result = obj.GetMyEmployee(id) as StatusCodeResult;
            //var ResultCode = (StatusCodeResult) Result;

            //Assert
            Assert.Equal(404, Result.StatusCode);

        }
    }
}
