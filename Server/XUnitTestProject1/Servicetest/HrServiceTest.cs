using E_TransferWebApi.Models;
using E_TransferWebApi.Repository;
using E_TransferWebApi.Services;
using Moq;
using System;
using System.Collections.Generic;
using Xunit;

namespace XUnitTestProject1
{
    public class HrServiceTest
    {
        [Fact] //First Test Case
        public void Test_The_Return_Type_to_be_List_of_RequestDetails_of_GetAllRequest_Method()
        {
            //Arrange
            List<Requests> requestList = new List<Requests>();
            //set the data to be returned from the niit database
            string psa = "0033";
            EmployeeDetails employee = new EmployeeDetails() {EmployeeCode = "1234", EmployeeName = "Monika singh"};
            //mocking data from the repo
            requestList.Add(new Requests() { RequestId = 1, EmployeeCode = "12345678", NewOuCode = "delhi", RequestStatus = RequestStatus.Pending, PendingWith = PendingWith.CSO });
            var mockReqRepo = new Mock<IRequestDetailsRepo>();
            var mockEmpDbRepo = new Mock<IEmployeeDbRepo>();
            //setting up the mock repo
            mockReqRepo.Setup(m => m.GetAllRequest()).Returns(requestList);
            mockEmpDbRepo.Setup(m => m.GetPsa(It.IsAny<string>())).Returns(psa);
            mockEmpDbRepo.Setup(m => m.GetOneEmployee(It.IsAny<string>())).Returns(employee);
            mockEmpDbRepo.Setup(m => m.GetOneEmployee(It.IsAny<string>())).Returns(employee);
            HRService obj = new HRService(mockReqRepo.Object , mockEmpDbRepo.Object);

            // Act
            var action1 = obj.GetAllRequest("00056944");

            // Assert
            Assert.IsType(typeof(List<HrViewModel>), action1);
            Assert.NotNull(action1);

        }

        [Fact]         //Second Test case
        public void Test_The_Return_Type_tobe_List_of_GetAll_Method_and_list_tobe_Empty_when_no_RequestDetails_is_returned_from_repo()
        {
            //Arrange
            List<Requests> requestList = new List<Requests>();
            //set the data to be returned from the niit database
            string psa = "0033";
            EmployeeDetails employee = new EmployeeDetails() { EmployeeCode = "1234", EmployeeName = "Monika singh" };
            var mockReqRepo = new Mock<IRequestDetailsRepo>();
            var mockEmpDbRepo = new Mock<IEmployeeDbRepo>();
            //setting up the mock repo
            mockReqRepo.Setup(m => m.GetAllRequest()).Returns(requestList);
            mockEmpDbRepo.Setup(m => m.GetPsa(It.IsAny<string>())).Returns(psa);
            mockEmpDbRepo.Setup(m => m.GetOneEmployee(It.IsAny<string>())).Returns(employee);
            HRService obj = new HRService(mockReqRepo.Object, mockEmpDbRepo.Object);
            //Act
            var result = obj.GetAllRequest("00056944");
            //Assert
            Assert.IsType<List<HrViewModel>>(result);
            Assert.Empty(result);
           
        }

        [Fact] //Third test case
        public void Test_if_null_is_returned_from_the_niit_db_in_GetAllRequest_Method()
        {
            //Arrange
            List<Requests> requestList = new List<Requests>();
            //set the data to be returned from the niit database
            string psa = null;
            var mockReqRepo = new Mock<IRequestDetailsRepo>();
            var mockEmpDbRepo = new Mock<IEmployeeDbRepo>();
            //setting up the mock repo
            mockReqRepo.Setup(m => m.GetAllRequest()).Returns(requestList);
            mockEmpDbRepo.Setup(m => m.GetPsa(It.IsAny<string>())).Returns(psa);
            HRService obj = new HRService(mockReqRepo.Object, mockEmpDbRepo.Object);

            // Act
            var action1 = obj.GetAllRequest("00056944");

            // Assert
            Assert.IsType(typeof(List<HrViewModel>), action1);
            Assert.Empty(action1);

        }
        [Fact]  //tenth test case
        public void Test_the_return_type_of_the_GetAllDiscrepantRecordsList_to_be_listType_when_discrepant_records_are_encountered()
        {
            //arrange
            EmployeeDetails emp = new EmployeeDetails()
            {
                SupervisorCode = "11",
                SupervisorName = "db",
                PsaCode = "2",
                PaCode = "2",
                OuCode = "2",
                CcCode = "2"
            };
            List<Requests> requestList = new List<Requests>();
            List<DiscrepancyReport> discrepancyList = new List<DiscrepancyReport>();
            //setting up the data to be returned to the repo
            requestList.Add(new Requests() { RequestId = 1 ,EmployeeCode = "00000068",RequestStatus = RequestStatus.Completed , DateOfCompletionRequest = DateTime.Parse("10/8/2017") , NewPsaCode = "1" , NewCcCode = "1" , NewPaCode = "1" , NewOuCode = "1"});
            discrepancyList.Add(new DiscrepancyReport() {RequestId = 1 , EmployeeCode = "00000068"  });
            var mockReq = new Mock<IRequestDetailsRepo>();
            var mockEmpDbRepo = new Mock<IEmployeeDbRepo>();
            //setting up the mock repo
            mockReq.Setup(x => x.GetAllClearedRequest()).Returns(requestList);
            mockEmpDbRepo.Setup(m => m.GetOneEmployee(It.IsAny<string>())).Returns(emp);
            mockEmpDbRepo.Setup(x => x.GetOneEmployee(It.IsAny<string>())).Returns(emp);
            HRService obj = new HRService(mockReq.Object, mockEmpDbRepo.Object);

            //act
            var result = obj.GetAllDiscrepantRecordsList();

            //Assert
            Assert.IsType<List<DiscrepancyReport>>(result);
            Assert.NotNull(result);
        }

        [Fact]  //tenth test case
        public void Test_the_return_type_of_the_GetAllDiscrepantRecordsList_to_be_listType_to_be_empty_when_discrepant_records_are_not_encountered()
        {
            //arrange
            EmployeeDetails emp = new EmployeeDetails()
            {
                SupervisorCode = "11",
                SupervisorName = "db",
                PsaCode = "1",
                PaCode = "1",
                OuCode = "1",
                CcCode = "1"
            };
            
            List<Requests> requestList = new List<Requests>();
            requestList.Add(new Requests() { RequestId = 1, EmployeeCode = "00000068", RequestStatus = RequestStatus.Completed , DateOfCompletionRequest = DateTime.Parse("10/8/2017"), NewPsaCode = "1", NewCcCode = "1", NewPaCode = "1", NewOuCode = "1" });
            var mockReq = new Mock<IRequestDetailsRepo>();
            var mockEmpDbRepo = new Mock<IEmployeeDbRepo>();
            //setting up the mock repo
            mockReq.Setup(x => x.GetAllClearedRequest()).Returns(requestList);
            mockEmpDbRepo.Setup(x => x.GetOneEmployee(It.IsAny<string>())).Returns(emp);
            HRService obj = new HRService(mockReq.Object, mockEmpDbRepo.Object);

            //act
            var result = obj.GetAllDiscrepantRecordsList();

            //Assert
            Assert.IsType<List<DiscrepancyReport>>(result);
            Assert.Empty(result);
        }

    }
}
