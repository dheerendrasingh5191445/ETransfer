using E_TransferWebApi.Controllers;
using E_TransferWebApi.Models;
using E_TransferWebApi.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using Xunit;

namespace XUnitTestProject1
{
    public class AssetControllerTest
    {
        [Fact]
        public void Test_The_Return_Type_to_be_Not_Found_of_Get_Method_if_no_object_is_returned_from_service()
        {
            //Arrange
            //initialisations
            List<AssetDetails> assetList = new List<AssetDetails>();

            //mocking the service
            var mockService = new Mock<IAssetControllerService>();

            //setting up the response for the mocked service
            mockService.Setup(m => m.GetRequestStatus()).Returns(assetList);
            AssetController obj = new AssetController(mockService.Object);

            // Act
            IActionResult action1 = obj.Get();
            action1 = (NotFoundObjectResult)action1;

            // Assert
            Assert.IsType<NotFoundObjectResult>(action1);
        }

        [Fact]
        public void Test_The_Return_Type_to_be_Ok_result_of_Get_Method_when_list_is_returned()
        {
            //Arranges
            //initialisations
            List<AssetDetails> assetList = new List<AssetDetails>
            {
                new AssetDetails { AssetId = 1, AssetCode = "124", AssetStatus = 0, ReAssignedTo = "122" },
                new AssetDetails { AssetId = 2, AssetCode = "124", AssetStatus = 0, ReAssignedTo = "122" }
            };

            //mocking the service
            var mockService = new Mock<IAssetControllerService>(); 

            //setting up the response for the mocked service
            mockService.Setup(m => m.GetRequestStatus()).Returns(assetList); 
            AssetController obj = new AssetController(mockService.Object);

            // Act
            IActionResult action1 = obj.Get();
            action1 = (OkObjectResult)action1;

            // Assert
            Assert.IsType<OkObjectResult>(action1);
            Assert.Equal(assetList, (action1 as OkObjectResult).Value);
        }

        [Fact]
        public void Test_The_Return_Type_to_be_StatusCode500_of_Get_Method_if_exception_is_thrown()
        {
            //Arrange
            List<Assets> assetList = new List<Assets>();
            var mockService = new Mock<IAssetControllerService>(); //mocking the service
            mockService.Setup(m => m.GetRequestStatus()).Throws<Exception>(); //setting up the response for the mocked service
            AssetController obj = new AssetController(mockService.Object);

            // Act
            IActionResult action1 = obj.Get();
            action1 = (StatusCodeResult)action1;

            // Assert
            Assert.IsType<StatusCodeResult>(action1);
            Assert.Equal(500, (action1 as StatusCodeResult).StatusCode);
        }

        [Fact]
        public void Test_The_Return_Type_to_be_StatusCode102_of_Get_Method_When_Timeout_exception_is_thrown()
        {
            //Arrange
            List<Assets> assetList = new List<Assets>();
            var mockService = new Mock<IAssetControllerService>(); //mocking the service
            mockService.Setup(m => m.GetRequestStatus()).Throws<TimeoutException>(); //setting up the response for the mocked service
            AssetController obj = new AssetController(mockService.Object);

            // Act
            IActionResult action1 = obj.Get();
            action1 = (StatusCodeResult)action1;

            // Assert
            Assert.IsType<StatusCodeResult>(action1);
            Assert.Equal(102, (action1 as StatusCodeResult).StatusCode);
        }

        [Fact]
        public void Test_The_Return_Type_to_be_Not_Found_of_GetDiscrepantRecords_Method_if_no_object_is_returned_from_service()
        {
            //Arrange
            List<AssetControllerDiscrepancyReport> assetList = new List<AssetControllerDiscrepancyReport>();
            var mockService = new Mock<IAssetControllerService>();
            //setting up service with mock data
            mockService.Setup(m => m.GetDiscrepantRecords()).Returns(assetList);
            AssetController obj = new AssetController(mockService.Object);

            // Act
            IActionResult action1 = obj.GetDiscrepantRequest();
            action1 = (NotFoundObjectResult)action1;

            // Assert
            Assert.IsType<NotFoundObjectResult>(action1);
        }

        [Fact]
        public void Test_The_Return_Type_to_be_Ok_result_of_GetDiscrepantRecords_Method_when_list_is_returned()
        {
            //Arranges
            List<AssetControllerDiscrepancyReport> assetList = new List<AssetControllerDiscrepancyReport>
            {
                new AssetControllerDiscrepancyReport { RequestId = 1, RepEmployeeCode = "12345678", RepEmployeeName = "Rajiv" },
                new AssetControllerDiscrepancyReport { RequestId = 2, RepEmployeeCode = "12345679", RepEmployeeName = "Rajeev" }
            };
            var mockService = new Mock<IAssetControllerService>(); //mocking service
            //setting up service with mock data
            mockService.Setup(m => m.GetDiscrepantRecords()).Returns(assetList);
            //assigning constructor with the mock service
            AssetController obj = new AssetController(mockService.Object); 

            // Act
            IActionResult action1 = obj.GetDiscrepantRequest();
            action1 = (OkObjectResult)action1;

            // Assert
            Assert.IsType<OkObjectResult>(action1);
            Assert.Equal(assetList, (action1 as OkObjectResult).Value);
        }

        [Fact]
        public void Test_The_Return_Type_to_be_StatusCode500_of_GetDiscrepantRecords_Method_if_exception_is_thrown()
        {
            //Arrange

            var mockService = new Mock<IAssetControllerService>();
            mockService.Setup(m => m.GetDiscrepantRecords()).Throws<Exception>();
            //assigning constructor with the mock service
            AssetController obj = new AssetController(mockService.Object);

            // Act
            IActionResult action1 = obj.GetDiscrepantRequest();
            action1 = (StatusCodeResult)action1;

            // Assert
            Assert.IsType<StatusCodeResult>(action1);
            Assert.Equal(500, (action1 as StatusCodeResult).StatusCode);
        }

        [Fact]
        public void Test_The_Return_Type_to_be_StatusCode102_of_GetDiscrepantRecords_Method_When_Timeout_exception_is_thrown()
        {
            //Arrange

            var mockService = new Mock<IAssetControllerService>();
            //setting up service with mock exception
            mockService.Setup(m => m.GetDiscrepantRecords()).Throws<TimeoutException>();
            //assigning constructor with the mock service
            AssetController obj = new AssetController(mockService.Object);

            // Act
            IActionResult action1 = obj.GetDiscrepantRequest();
            action1 = (StatusCodeResult)action1;

            // Assert
            Assert.IsType(typeof(StatusCodeResult), action1);
            Assert.Equal(102, (action1 as StatusCodeResult).StatusCode);
        }

        [Fact]     

        public void Check_if_GetAssetDetailsByEmpCode_returns_a_list_of_AssetDetails()
        {
            //Arrange
            var mockService = new Mock<IAssetControllerService>();
            Assets asset = new Assets { AssetId = 1, AssetCode = "124", AssetStatus = 0, ReassignedTo = "122" };
            List<Assets> assetList = new List<Assets>();
            assetList.Add(asset);
            //setting up service with mock data
            mockService.Setup(x => x.GetAssetDetailsByEmpcode(It.IsAny<string>())).Returns(assetList);
            //assigning constructor with the mock service
            AssetController obj = new AssetController(mockService.Object);

            //Act
            IActionResult result = obj.Get("00054967");

            var result2 = result as OkObjectResult;

            Assert.Equal(200, result2.StatusCode);
            //Assert.Equal(assetList, result2.Value);
            //Assert.NotNull(result);
            //Assert.IsType(typeof(List<AssetDetails>), result);

        }

        [Fact]        
        public void Check_if_GetAssetDetailsByEmpCode_does_not_returns_a_list_of_AssetDetails()
        {
            //Arrange
            var mockService = new Mock<IAssetControllerService>();
            Assets asset = new Assets { AssetId = 1, AssetCode = "124", AssetStatus = 0, ReassignedTo = "122" };
            List<Assets> list = new List<Assets>();
            //setting up service with mock exception
            mockService.Setup(x => x.GetAssetDetailsByEmpcode(It.IsAny<string>())).Returns(list);
            //assigning constructor with the mock service
            AssetController obj = new AssetController(mockService.Object);

            //Act
            IActionResult result = obj.Get("00054967");
            var result1 = (NotFoundObjectResult)result;

            //Assert
            Assert.Equal(404, result1.StatusCode);
            //Assert.IsType(typeof(NotFoundObjectResult),result);
            // Assert.IsNotType(typeof(List<AssetDetails>), result);

        }

        [Fact]               //sixth Test Case
        public void Check_for_GettingAssetList_ByEmployeeCode_returns_a_badrequest()
        {
            //Arrange
            var mockService = new Mock<IAssetControllerService>();
            mockService.Setup(x => x.GetAssetDetailsByEmpcode(It.IsAny<string>())).Throws<TimeoutException>();
            //assigning constructor with the mock service
            AssetController obj = new AssetController(mockService.Object);

            //Act
            IActionResult result = obj.Get("00052647");
            var result2 = (StatusCodeResult)result;

            //Assert
            Assert.Equal(102, result2.StatusCode);
            // Assert.IsType(typeof(BadRequestResult),result2);
        }

        [Fact]               //sixth Test Case
        public void Check_for_GettingAssetList_ByEmployeeCode_returns_a_status_code500()
        {
            //Arrange
            var mockService = new Mock<IAssetControllerService>();
            mockService.Setup(x => x.GetAssetDetailsByEmpcode(It.IsAny<string>())).Throws<Exception>();
            //assigning constructor with the mock service
            AssetController obj = new AssetController(mockService.Object);

            //Act
            IActionResult result = obj.Get("00052647");
            var result2 = (StatusCodeResult)result;

            //Assert
            Assert.Equal(500, result2.StatusCode);
            // Assert.IsType(typeof(BadRequestResult),result2);
        }

    }
}
