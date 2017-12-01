import { TestBed, async, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend,
  RequestMethod
} from '@angular/http';
import { MockBackend,MockConnection } from '@angular/http/testing';
import { AssetControlService } from './asset-control.service';

describe('AssetControlService', () => {
    

      beforeEach(() => {
        //creating a test module for testing supervisor service
        TestBed.configureTestingModule({ 
          imports: [HttpModule],
          providers: [
              //providing the internal http requirement which call to server and mocking the http data
            { provide: XHRBackend, useClass: MockBackend },
            AssetControlService
           ]
        });
      });  

      it('should call Http Get and return an Promise<RequestData[]>',
      inject([AssetControlService, XHRBackend], (assetControlService, mockBackend) => {

      //mocking the response for the get method of the service
      const mockResponse = [
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
              "assignedto":193503
             } 
          ];

      //here mockResponse is provided to the Observable stream to subscriber 
      mockBackend.connections.subscribe((connection) => {
          expect(connection.request.method).toBe(RequestMethod.Get)
          connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      //mockRequestData is the response which is mock by the http call
      assetControlService.GetAssetList().then((mockAssetData) =>{
          expect(mockAssetData.length).toBe(1);
          expect(mockAssetData[0].employeeCode).toEqual(12156959);
          
      })
}))

it('should call Http Get and return an Promise<AssetDiscrepancyReport>',
inject([AssetControlService, XHRBackend], (assetControlService, mockBackend) => {

//mocking the response for the get method of the service
const mockResponse = [
      {  
        assetCode : "0000003453",
        requestId : "1",
        repEmployeeCode:"00058644" ,
        repEmployeeName:"monika",
        sapEmployeeCode:"0008668",
        sapEmployeeName:"papori", 
       } 
    ];

//here mockResponse is provided to the Observable stream to subscriber 
mockBackend.connections.subscribe((connection) => {
    expect(connection.request.method).toBe(RequestMethod.Get)
    connection.mockRespond(new Response(new ResponseOptions({
    body: JSON.stringify(mockResponse)
  })));
});

//mockRequestData is the response which is mock by the http call
assetControlService.getDiscrepancyReport().subscribe((mockAssetData) =>{
    expect(mockAssetData.length).toBe(1);
    expect(mockAssetData[0].assetCode).toEqual("0000003453");
    
})
}))

it('should catch the error 404',
inject([AssetControlService, XHRBackend], (assetControlService, mockBackend) => {

//here mockResponse is provided to the Observable stream to subscriber 
mockBackend.connections.subscribe((connection) => {
    connection.mockError(new Response(new ResponseOptions({
     status:404
  })));
});

//mockerrorData is the response which is mock by the http call
assetControlService.getDiscrepancyReport().subscribe((mockerrorData) =>{ } ,(error) => {
    expect(error).toBe(404);   
})
}))

it('should catch the error 400',
inject([AssetControlService, XHRBackend], (assetControlService, mockBackend) => {

//here mockResponse is provided to the Observable stream to subscriber 
mockBackend.connections.subscribe((connection) => {
    connection.mockError(new Response(new ResponseOptions({
     status:400
  })));
});

//mockerrorData is the response which is mock by the http call
assetControlService.GetAssetList().then((mockerrorData) =>{ } ,(error) => {
    expect(error).toBe(400);   
})
}))

it('should catch the error 500',
inject([AssetControlService, XHRBackend], (assetControlService, mockBackend) => {

//here mockResponse is provided to the Observable stream to subscriber 
mockBackend.connections.subscribe((connection) => {
    connection.mockError(new Response(new ResponseOptions({
     status:500
  })));
});

//mockerrorData is the response which is mock by the http call
assetControlService.getDiscrepancyReport().subscribe((mockerrorData) =>{ } ,(error) => {
    expect(error).toBe(500);   
})
}))
});