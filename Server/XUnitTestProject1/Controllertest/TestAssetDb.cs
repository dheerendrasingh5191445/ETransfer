using System;
using System.Collections.Generic;
using System.Text;
using E_TransferWebApi.Controllers;
using E_TransferWebApi.Models;
using E_TransferWebApi.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace XUnitTestProject1
{
    public class TestAssetDb
    {
        [Fact]
        public void TestAssetDbIsReturningCorrectResult()
        {
            //Arrange
            string id = "123";
            var mockService = new Mock<IAssetDbService>();
            List<AssetDetails> AssetList = new List<AssetDetails>();
            AssetList.Add(new AssetDetails()
            {
                EmployeeCode = "122",
                CompanyCode = "safdas"
               
            });
            mockService.Setup(x => x.GetAllAssetDetails(id)).Returns(AssetList);
            AssetDbController obj = new AssetDbController(mockService.Object);

            //Act
            var result = (OkObjectResult)obj.GetMyAsset(id);

            //Assert
            Assert.Equal(200, result.StatusCode);

        }
        [Fact]
        public void TestAssetDbContentNotFoundInList()
        {
            //Arrange
            string id = "123";
            var mockService = new Mock<IAssetDbService>();
            List<AssetDetails> AssetList = new List<AssetDetails>();
            mockService.Setup(x => x.GetAllAssetDetails(id)).Returns(AssetList);
            AssetDbController obj = new AssetDbController(mockService.Object);

            //Act
            var Result = obj.GetMyAsset(id) as StatusCodeResult;
            //var ResultCode = (StatusCodeResult) Result;

            //Assert
            Assert.Equal(204, Result.StatusCode);

        }
        [Fact]
        public void TestAssetDbthrowsexception()
        {
            //Arrange
            string id = "123";
            var mockService = new Mock<IAssetDbService>();
            mockService.Setup(x => x.GetAllAssetDetails(id)).Throws(new Exception());
            AssetDbController obj = new AssetDbController(mockService.Object);

            //Act
            var Result = obj.GetMyAsset(id) as StatusCodeResult;
            //var ResultCode = (StatusCodeResult) Result;

            //Assert
            Assert.Equal(404, Result.StatusCode);

        }
    }
}
