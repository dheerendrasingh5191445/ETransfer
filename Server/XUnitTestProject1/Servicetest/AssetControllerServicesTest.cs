using E_TransferWebApi.Models;
using E_TransferWebApi.Repository;
using E_TransferWebApi.Services;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace XUnitTestProject1
{
    public class AssetControllerServicesTest
    {
        [Fact]     //First Test Case
        public void Check_if_GetAllRequest_returns_a_list()
        {
            //Arrange 
            //mocking repository
            var mockRepo = new Mock<IRequestDetailsRepo>();
            var mockAssetRepo = new Mock<IAssetDetailsRepo>();
            var mockAssetDbRepo = new Mock<IAssetDbRepo>();
            var mockEmpDbRepo = new Mock<IEmployeeDbRepo>();

            //initialisations
            List<Assets> assetList = new List<Assets>();
            List<Requests> reqList = new List<Requests>();
            EmployeeDetails emp = new EmployeeDetails(){ EmployeeCode = "00059644" , EmployeeName = "Monika"};
            Requests request = new Requests { RequestId = 1 };
            reqList.Add(request);

            //setting up the mocked repository
            mockEmpDbRepo.Setup(x => x.GetName(It.IsAny<string>())).Returns(emp);
            mockRepo.Setup(x => x.GetAllRequest()).Returns(reqList);
            mockAssetRepo.Setup(x => x.GetAssetByEmpCode(It.IsAny<string>())).Returns(assetList);
            AssetControllerService obj = new AssetControllerService(mockAssetRepo.Object, mockRepo.Object , mockAssetDbRepo.Object , mockEmpDbRepo.Object);

            //Act
            List<Assets> result = obj.GetAssetDetailsByEmpcode("00056734");

            //Assert
            Assert.IsType<List<Assets>>(result);

        }
        [Fact]  
        public void Test_the_return_type_of_the_GetAllDiscrepantRecordsList_to_be_listType_when_discrepant_records_are_encountered()
        {
            //arrange
            AssetDetails asset = new AssetDetails() {AssetCode = "0000345630" , EmployeeCode = "00000068" };
            List<Assets> assetList = new List<Assets>();
            List<Requests> requestList = new List<Requests>();
            List<AssetControllerDiscrepancyReport> discrepancyList = new List<AssetControllerDiscrepancyReport>();
            requestList.Add(new Requests() { RequestId = 1, EmployeeCode = "00000068", RequestStatus = RequestStatus.Completed, DateOfCompletionRequest = DateTime.Parse("10/8/2017"), NewPsaCode = "1", NewCcCode = "1", NewPaCode = "1", NewOuCode = "1" });
            assetList.Add(new Assets(){ReassignedTo = "00000068" ,AssetCode = "0000345630" });
            EmployeeDetails emp = new EmployeeDetails() { EmployeeCode = "00059644", EmployeeName = "Monika" };
            var mockReq = new Mock<IRequestDetailsRepo>();
            var mockAssetRepo = new Mock<IAssetDetailsRepo>();
            var mockAssetDbRepo = new Mock<IAssetDbRepo>();
            var mockEmpDbRepo = new Mock<IEmployeeDbRepo>();
            mockEmpDbRepo.Setup(x => x.GetName(It.IsAny<string>())).Returns(emp);
            mockReq.Setup(x => x.GetAllClearedRequest()).Returns(requestList);
            mockAssetRepo.Setup(x => x.GetAssetByEmpCode(It.IsAny<string>())).Returns(assetList);
            mockAssetDbRepo.Setup(x => x.GetAssetByCode(It.IsAny<string>())).Returns(asset);
            AssetControllerService obj = new AssetControllerService(mockAssetRepo.Object, mockReq.Object, mockAssetDbRepo.Object, mockEmpDbRepo.Object);

            //act
            var result = obj.GetDiscrepantRecords();

            //Assert
            Assert.IsType<List<AssetControllerDiscrepancyReport>>(result);
            Assert.Empty(result);
        }

        [Fact] 
        public void Test_the_return_type_of_the_GetAllDiscrepantRecordsList_to_be_listType_to_be_empty_when_discrepant_records_are_not_encountered()
        {
            //arrange
            AssetDetails asset = new AssetDetails() { AssetCode = "0000345630", EmployeeCode = "00000068" };
            List<Assets> assetList = new List<Assets>();
            List<Requests> requestList = new List<Requests>();
            EmployeeDetails emp = new EmployeeDetails() { EmployeeCode = "00059644", EmployeeName = "Monika" };
            List<AssetControllerDiscrepancyReport> discrepancyList = new List<AssetControllerDiscrepancyReport>();
            requestList.Add(new Requests() { RequestId = 1, EmployeeCode = "00000068", RequestStatus = RequestStatus.Completed, DateOfCompletionRequest = DateTime.Parse("10/8/2017"), NewPsaCode = "1", NewCcCode = "1", NewPaCode = "1", NewOuCode = "1" });
            assetList.Add(new Assets() { ReassignedTo = "00000069", AssetCode = "0000345630" });
            discrepancyList.Add(new AssetControllerDiscrepancyReport() { RequestId = 1, RepEmployeeCode  = "00000069" , SapEmployeeCode = "00000068"});
            var mockReq = new Mock<IRequestDetailsRepo>();
            var mockAssetRepo = new Mock<IAssetDetailsRepo>();
            var mockAssetDbRepo = new Mock<IAssetDbRepo>();
            var mockEmpDbRepo = new Mock<IEmployeeDbRepo>();
            mockEmpDbRepo.Setup(x => x.GetName(It.IsAny<string>())).Returns(emp);
            mockReq.Setup(x => x.GetAllClearedRequest()).Returns(requestList);
            mockAssetRepo.Setup(x => x.GetAssetByEmpCode(It.IsAny<string>())).Returns(assetList);
            mockAssetDbRepo.Setup(x => x.GetAssetByCode(It.IsAny<string>())).Returns(asset);
            AssetControllerService obj = new AssetControllerService(mockAssetRepo.Object, mockReq.Object, mockAssetDbRepo.Object, mockEmpDbRepo.Object);

            //act
            var result = obj.GetDiscrepantRecords();

            //Assert
            Assert.IsType<List<AssetControllerDiscrepancyReport>>(result);
            Assert.NotNull(result);
        }

        [Fact]
        public void Test_the_return_type_of_the_GetRequestStatus_to_be_listType()
        {
            //arrange
            List<Assets> assetList = new List<Assets>();
            AssetDetails asset = new AssetDetails();
            List<Requests> requestList = new List<Requests>();
            EmployeeDetails emp = new EmployeeDetails() { EmployeeCode = "00059644", EmployeeName = "Monika" };
            requestList.Add(new Requests() { RequestId = 1, EmployeeCode = "00000068", RequestStatus = RequestStatus.Completed, PendingWith =PendingWith.Approved, DateOfCompletionRequest = DateTime.Parse("10/8/2017"), NewPsaCode = "1", NewOuCode = "1", NewPaCode = "1", NewCcCode = "1" });
            assetList.Add(new Assets() { ReassignedTo = "00000069", AssetCode = "0000345630" });
            var mockReq = new Mock<IRequestDetailsRepo>();
            var mockAssetRepo = new Mock<IAssetDetailsRepo>();
            var mockAssetDbRepo = new Mock<IAssetDbRepo>();
            var mockEmpDbRepo = new Mock<IEmployeeDbRepo>();
            mockEmpDbRepo.Setup(x => x.GetName(It.IsAny<string>())).Returns(emp);
            mockReq.Setup(x => x.GetAllRequest()).Returns(requestList);
            mockAssetRepo.Setup(x => x.GetAssetByEmpCode(It.IsAny<string>())).Returns(assetList);
            mockAssetDbRepo.Setup(x => x.GetAssetByCode(It.IsAny<string>())).Returns(asset);
            AssetControllerService obj = new AssetControllerService(mockAssetRepo.Object, mockReq.Object, mockAssetDbRepo.Object, mockEmpDbRepo.Object);

            //act
            var result = obj.GetRequestStatus();

            //Assert
            Assert.IsType<List<AssetDetails>>(result);
            Assert.NotNull(result);
        }

        [Fact]  
        public void Test_the_return_type_of_the_GetRequestStatus_to_be_listType_when_norequest_is_returned_from_the_database()
        {
            //arrange
            List<Assets> assetList = new List<Assets>();
            List<Requests> requestList = new List<Requests>();
            AssetDetails asset = new AssetDetails();
            assetList.Add(new Assets() { ReassignedTo = "00000069", AssetCode = "0000345630" });
            EmployeeDetails emp = new EmployeeDetails() { EmployeeCode = "00059644", EmployeeName = "Monika" };
            var mockReq = new Mock<IRequestDetailsRepo>();
            var mockAssetRepo = new Mock<IAssetDetailsRepo>();
            var mockAssetDbRepo = new Mock<IAssetDbRepo>();
            var mockEmpDbRepo = new Mock<IEmployeeDbRepo>();
            mockEmpDbRepo.Setup(x => x.GetName(It.IsAny<string>())).Returns(emp);
            mockReq.Setup(x => x.GetAllRequest()).Returns(requestList);
            mockAssetRepo.Setup(x => x.GetAssetByEmpCode(It.IsAny<string>())).Returns(assetList);
            mockAssetDbRepo.Setup(x => x.GetAssetByCode(It.IsAny<string>())).Returns(asset);
            AssetControllerService obj = new AssetControllerService(mockAssetRepo.Object, mockReq.Object, mockAssetDbRepo.Object, mockEmpDbRepo.Object);

            //act
            var result = obj.GetRequestStatus();

            //Assert
            Assert.IsType<List<AssetDetails>>(result);
            Assert.Empty(result);
        }

    }
}
