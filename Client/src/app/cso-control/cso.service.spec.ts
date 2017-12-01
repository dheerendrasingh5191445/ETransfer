import { TestBed, async, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend,
  RequestMethod
} from '@angular/http';
//importing all the Pridefined service which is used in our service
import { MockBackend, MockConnection } from '@angular/http/testing';
//importing our service which need to be test
import { CsoService } from './cso.service';
//start of the test suit for service
describe('CsoService', () => {
  //mocking the data
  const mockResponse =
    [
      {
        requestId: '2',
        employeeCode: '122',
        supervisorCode: '1234',
        typeOfRequest: "location",
        newpacode: "saswds",
        newpsacode: "gsfhas",
        newOucode: "saswds",
        newCcCode: "saswds",
        dateofrequest: "2017-01-01T00:00:00",
        requestStatus: '1',
        pendingWith: "3"
      },
      {
        requestId: '4',
        employeeCode: '122',
        supervisorCode: '1234',
        typeOfRequest: "location",
        newpacode: "saswds",
        newpsacode: "gsfhas",
        newOucode: "saswds",
        newCcCode: "saswds",
        dateofrequest: "2017-01-01T00:00:00",
        requestStatus: '1',
        pendingWith: '3'
      }
    ]
    ;
  const mockAssets =
    [
      {
        "assetCode": 9877,
        "employeeCode": 12156959,
        "companyCode": 34754,
        "description": "laptop",
        "quantity": 1,
        "location": "delhi",
        "capitalisationDate": "12/03/2017",
        "assetStatus": "pending",
        "assigntoEmailId": "er.alruba2017@gmail.com",
        "assignedto": 193503
      }
    ]
    ;
  //configuring the testing environment before each test case
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        //provide the mock service and backend
        { provide: XHRBackend, useClass: MockBackend },
        CsoService
      ]
    });
  });
  //testing for the pending request table
  it('should return an Observable<Array<Requests>> for getViewAllRequest',
    inject([CsoService, XHRBackend], (csoService, mockBackend) => {
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      //calling the method which need to be test
      csoService.getViewAllRequest().subscribe((requests) => {
        expect(requests.length).toBe(2);
        expect(requests[0].typeOfRequest).toEqual('location');
      });
    }));//end of first spec
  //checking the service mehthod for the approval list 
  it('should  return an Observable<Array<Assets>> for getViewApprovedRequest ',
    inject([CsoService, XHRBackend], (csoService, mockBackend) => {
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      //calling the method which need to be test
      csoService.getViewApprovedRequest().subscribe((requests) => {
        expect(requests.length).toBe(2);
        expect(requests[0].typeOfRequest).toEqual('location');
      });
    }));//end of first spec
  //calling the service method for which will return the asset list
  it('should return an Observable<Array<Assets>> for  getAssetDetailsByCode',
    inject([CsoService, XHRBackend], (csoService, mockBackend) => {
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockAssets)
        })));
      });
      //calling the method which need to be test
      csoService.getAssetDetailsByCode(12156959).subscribe((requests) => {
        expect(requests.length).toBe(1);
        expect(requests[0].assetCode).toEqual(9877);
      });
    }));//end of second 
  it('check of put method',
    inject([CsoService, XHRBackend], (csoService, mockBackend) => {
      mockBackend.connections.subscribe((connection) => {
        //test request have put method
        expect(connection.request.method).toBe(RequestMethod.Put);
        //test content type
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200
        })));
      });
      //calling the method which need to be test
      csoService.updateApprovalStatus(mockResponse).subscribe(
        (value) => {
          expect(value).toBeDefined();
          expect(value.status).toBe(200);
        });
    }));//end of third it
  it('check of http status with 404',
    inject([CsoService, XHRBackend], (csoService, mockBackend) => {
      mockBackend.connections.subscribe((connection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);
        connection.mockError(new Response(new ResponseOptions({
          status: 404
        })));
      });
      //calling the method which need to be test
      csoService.getViewAllRequest().subscribe(success => { }, error => {
        expect(error).toBe(404);
      });
    }));//end of fourth it
  it('check of http status with 400',
    inject([CsoService, XHRBackend], (csoService, mockBackend) => {
      mockBackend.connections.subscribe((connection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);
        connection.mockError(new Response(new ResponseOptions({
          status: 400
        })));
      });
      //calling the method which need to be test      
      csoService.getViewAllRequest().subscribe(success => { }, error => {
        expect(error).toBe(400);
      });
    }));//end of fifth it
  it('check of http status with 500',
    inject([CsoService, XHRBackend], (csoService, mockBackend) => {
      mockBackend.connections.subscribe((connection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);
        connection.mockError(new Response(new ResponseOptions({
          status: 500
        })));
      });
      //calling the method which need to be test
      csoService.getViewAllRequest().subscribe(success => { }, error => {
        expect(error).toBe(500);
      });
    }));//end of sixth it
}); //end of the test suit