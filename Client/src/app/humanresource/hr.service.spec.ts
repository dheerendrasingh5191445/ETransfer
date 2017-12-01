import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule,Http,Response,ResponseOptions,XHRBackend, RequestMethod} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { HrViewRequestService } from './hr-viewrequest.service';


describe('HrViewRequestService', () => {
    

      beforeEach(() => {
    
        TestBed.configureTestingModule({ //creating a test module for testing supervisor service
          imports: [HttpModule],
          providers: [
              //providing the internal http requirement which call to server and mocking the http data
            { provide: XHRBackend, useClass: MockBackend },
            HrViewRequestService
           ]
        });
      });   
            //Test case to check the method which get all the request pending with the HR
            it('should call Http Get and return an Promise<RequestData[]>',
                inject([HrViewRequestService, XHRBackend], (hrviewrequestservice, mockBackend) => {
        
                //mocking the response for the get method of the service
                const mockResponse = [
                    {
                        requestId: 3,employeeCode: 122,  supervisorCode: 1234, typeOfRequest: "location", newPa_Psacode: "saswds",
                        newOucode: "saswds", newCcCode: "saswds", dateOfRequest: "2017-01-01T00:00:00", requestStatus: 1, pendingWith: 1       
                    },
                    {
                        requestId: 4,employeeCode: 122,  supervisorCode: 1234, typeOfRequest: "location", newPa_Psacode: "saswds",
                        newOucode: "saswds", newCcCode: "saswds", dateOfRequest: "2017-01-01T00:00:00", requestStatus: 1, pendingWith: 1       
                    
                    }
                    ];

                //here mockResponse is provided to the Observable stream to subscriber 
                mockBackend.connections.subscribe((connection) => {
                  connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                  })));
                });

                //mockRequestData is the response which is mock by the http call
                hrviewrequestservice.getmypendingrequestlist().subscribe((mockRequestData) =>{
                
                    expect(mockRequestData.length).toBe(2);
                    expect(mockRequestData[0].pendingWith).toEqual(1);
                    expect(mockRequestData[1].pendingWith).toEqual(1);
                })
        }))




        it('should call getDiscrepancyReport',  //getting call to getDiscrepancyReport
        inject([HrViewRequestService, XHRBackend], (hrviewrequestservice, mockBackend) => {

        //mocking the response for the get method of the service
        const mockResponse = [
            {
                RequestId: 3,EmployeeCode: 122, EmployeeName:'ABC',  SupervisorCode: 1234, SupervisorName:'ert', RequestPsa: "location", RequestOu: "saswds",
                ResquestCc: "saswds", SapPa: "saswds", SapPsa: "2017-01-01T00:00:00", SapOu: 1, SapCc: 1       
            },
            {
              RequestId: 4,EmployeeCode: 122, EmployeeName:'ABC',  SupervisorCode: 1234, SupervisorName:'ert', RequestPsa: "location", RequestOu: "saswds",
              ResquestCc: "saswds", SapPa: "saswds", SapPsa: "2017-01-01T00:00:00", SapOu: 1, SapCc: 1       
            }
            ];

        //here mockResponse is provided to the Observable stream to subscriber 
        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
     
        });

        //mockRequestData is the response which is mock by the http call
        hrviewrequestservice.getDiscrepancyReport().subscribe((mockRequestD) =>{
            expect(mockRequestD.length).toBe(2);
            expect(mockRequestD[0].RequestId).toEqual(3);
            expect(mockRequestD[1].RequestId).toEqual(4);
        });
}));

        
        it('Should return Error 404',  // Appling Page not found error
        inject([HrViewRequestService, XHRBackend], (hrviewrequestservice, mockBackend) => {
       
        mockBackend.connections.subscribe((connection) => {
          expect(connection.request.method).toBe(RequestMethod.Get);
          connection.mockError(new ResponseOptions({status:404})); //Defining the mock error code that was sent by service
        });
        
        hrviewrequestservice.
        getDiscrepancyReport().subscribe(success =>{}, error=>{
          expect(error).toBe(404); //checking the status code is checked or not
          // Status code 404 is for Page not found
        });
           
            
        
      }));

      it('Should return Error 400', // Appling Bad request error
      inject([HrViewRequestService, XHRBackend], (hrviewrequestservice, mockBackend) => {
     
      mockBackend.connections.subscribe((connection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);
        connection.mockError(new ResponseOptions({status:400})); //Defining the mock error code that was sent by service
      });
      
      hrviewrequestservice.
      getDiscrepancyReport().subscribe(success =>{}, error=>{
        expect(error).toBe(400);  //checking the status code is checked or not
        // Status code 400 is for Bad Request
      });
    }));


       it('Should return Error 500',  // Appling Internal server error
      inject([HrViewRequestService, XHRBackend], (hrviewrequestservice, mockBackend) => {
     
      mockBackend.connections.subscribe((connection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);
        connection.mockError(new ResponseOptions({status:500})); //Defining the mock error code that was sent by service
        // Status code 500 is for Internal Server Error
      });
      
      hrviewrequestservice.
      getDiscrepancyReport().subscribe(success =>{}, error=>{
        expect(error).toBe(500);  //checking the status code is checked or not
          // Status code 500 is for Internal server error
      });
    }));
});
