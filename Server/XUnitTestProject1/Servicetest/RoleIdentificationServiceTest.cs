using AuthenticationWebApi.Controllers;
using AuthenticationWebApi.Models;
using AuthenticationWebApi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace XUnitTestProject1
{
    public class RoleIdentificationServiceTest
    {
        [Fact]
        public void Test_The_RoleIdentification_Method_When_No_Role_Found_For_User()
        {
            //Arranges
            //creating string which is return by method
            string value = "No role found";

            //creating mock object for the service which will independent the method for unit testing
            var mockService = new Mock<IRoleIdentificationService>();
            var mockOptionsService = new Mock<IOptions<Audience>>();
            var mockConfig = new Mock<IConfiguration>();
            //setting the expectation and behaviour of method which need to mock
            mockService.Setup(m => m.RoleIdentification(It.IsAny<string>())).Returns(value);
            //creating HRController object which need to test
            TokenHandlingController obj = new TokenHandlingController(mockService.Object,mockOptionsService.Object,mockConfig.Object);
            // Act
            var result = obj.RoleIdentification("00008313");
            // Assert
            //checking the expected result with the actual result
            Assert.Equal("Not a User", result);
        }

        [Fact]
        public void Test_The_RoleIdentification_Method_When_Role_Found_For_User()
        {
            //Arranges
            //creating string which is return by method
            string value = "CSO";

            //creating mock object for the service which will independent the method for unit testing
            var mockService = new Mock<IRoleIdentificationService>();
            var mockOptionsService = new Mock<IOptions<Audience>>();
            var mockConfig = new Mock<IConfiguration>();
            //setting the expectation and behaviour of method which need to mock
            mockService.Setup(m => m.RoleIdentification(It.IsAny<string>())).Returns(value);
            //creating HRController object which need to test
            TokenHandlingController obj = new TokenHandlingController(mockService.Object, mockOptionsService.Object, mockConfig.Object);
            // Act
            var result = obj.RoleIdentification("00008313");
            // Assert
            //checking the expected result with the actual result
            Assert.Equal("CSO", result); ;
        }

        [Fact]
        public void Test_The_RoleIdentification_Method_When_Exception_Thrown()
        {
            //Arranges
            //creating string which is return by method
            //creating mock object for the service which will independent the method for unit testing
            var mockService = new Mock<IRoleIdentificationService>();
            var mockOptionsService = new Mock<IOptions<Audience>>();
            var mockConfig = new Mock<IConfiguration>();
            //setting the expectation and behaviour of method which need to mock
            mockService.Setup(m => m.RoleIdentification(It.IsAny<string>())).Throws(new Exception());
            //creating HRController object which need to test
            TokenHandlingController obj = new TokenHandlingController(mockService.Object, mockOptionsService.Object, mockConfig.Object);
            // Act
            var result = obj.RoleIdentification("00008313");
            // Assert
            //checking the expected result with the actual result
            Assert.IsType<string>(result);
        }
    }
}
