import { TestBed, async, inject } from '@angular/core/testing';
import {
HttpModule,
Http,RequestMethod,
Response,
ResponseOptions,
XHRBackend
} from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend } from '@angular/http/testing';
import { GlobalUserService } from './globaluser.service';

import { FormsModule} from '@angular/forms';
const mockResponse =                              //Response being mocked for testing
[
 { assetId: 0, assetCode: 4,description:'laptop',employeeCode:'8',quantity:'9'},
 { assetId: 1, assetCode: 5,description: 'laptop',employeeCode:'8',quantity:'9'},
 { assetId: 2, assetCode: 6,description:'laptop',employeeCode:'8',quantity:'9'},
 { assetId: 3, assetCode: 7,description:'laptop',employeeCode:'8',quantity:'9' } 
];                                                //End of mock Response
describe('GlobalUserService', () => {             //start of first describe
beforeEach(() => {                                //start of first before each

  TestBed.configureTestingModule({                /* creates a module that overrides the actual dependencies with testing dependencies*/

    imports: [HttpModule,RouterTestingModule,FormsModule],    //imports being declared before setting the testing environment
    providers: [  
      GlobalUserService,                                      //provider tells the service on which testing is being performed
      { provide: XHRBackend, useClass: MockBackend },
    ]
  });
});                                                    //end of first before each

describe('getMyPendingRequest()', () => {              //start of second describe
  let service:GlobalUserService;
  beforeEach(inject([Http,XHRBackend],(http:Http,back:MockBackend) => {    /* injecting service and backend dependencies*/

    service = new GlobalUserService(http);
  }));
  it('should return an Observable<Array<assetCode>',             //FIRST test case Begins
      inject([GlobalUserService, XHRBackend], (GlobalUserService, mockBackend) => {      //injecting the service and backend dependencies
      
      mockBackend.connections.subscribe((connection) => {          /* setting up connections to Http whenever someone subcribes 
                                                                 to an http call */    
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      GlobalUserService.getMyPendingRequest().subscribe((data) => {
        expect(data.length).toBe(4);
        expect(data[0].assetCode).toEqual(4);
        expect(data[1].assetCode).toEqual(5);
        expect(data[2].description).toEqual('laptop');
        expect(data[3].assetCode).toEqual(7);
      });
  }));                                                          //FIRST test case ends
  describe('getMyAcceptedRequests()', () => {                    //start of nested describe
  it('should return an Observable<Array<assetCode>',            //SECOND test case begins
  inject([GlobalUserService, XHRBackend], (GlobalUserService, mockBackend) => {
  
  mockBackend.connections.subscribe((connection) => {     /* setting up connections to Http whenever someone subcribes 
                                                                 to an http call */  
    connection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify(mockResponse)
    })));
  });
  GlobalUserService.getMyAcceptedRequest().subscribe((data) => {
    expect(data.length).toBe(4);
    expect(data[0].assetCode).toEqual(4);
    expect(data[1].assetCode).toEqual(5);
    expect(data[2].description).toEqual('laptop');
    expect(data[3].assetCode).toEqual(7);
  });
}));                                                          //SECOND test case ends
});                                                    //end of nested describe
});                                                //end of second describe

it('can instantiate service when inject service',       //THIRD test case begins
inject([GlobalUserService], (service: GlobalUserService) => {
  expect(service instanceof GlobalUserService).toBe(true);
}));                                                      //THIRD test case ends

it('can instantiate service with "new"', inject([Http], (http: Http) => {      //FOURTH test case begins
expect(http).not.toBeNull('http should be provided');
let service = new GlobalUserService(http);
expect(service instanceof GlobalUserService).toBe(true, 'new service should be ok');
}));                                                                            //FOURTH test case ends

it('can provide the mockBackend as XHRBackend',                   //FIFTH test case begins
inject([XHRBackend], (backend: MockBackend) => {
  expect(backend).not.toBeNull('backend should be provided');
}));                                                              //FIFTH test case ends



describe('Approve Request()', () => {
it('approve request for global user',                                  //SIXTH test case begins
  inject([GlobalUserService, XHRBackend], (globalUserService, mockBackend) => {
    
              
  mockBackend.connections.subscribe((connection) => {
  connection.mockRespond(new Response(new ResponseOptions({
    status:200
      
    })
  ));
  
    expect(connection.request.method).toEqual(RequestMethod.Put ,'should return with correct method');
  });  
    globalUserService.approve(13,{ assetId:'1', assetCode :'12',employeeCode:'22',companyCode:'33',description:'laptop',quantity:'44',location:'greater noida',capitalisationDate:'12/08/2017',assetStatus:'pending',assignedTo:'sunil',emailId:'lakshyamthur20@gmail.com'})
    .then((p)=>{console.log("approve"+p.status)
    expect(p.status).toBe(200);
  });
}));                                                                  //SIXTH test case ends
});
describe('Reject Request()', () => {
it('reject request for global user',                                  //SEVENTH test case begins
  
    inject([GlobalUserService, XHRBackend], (globalUserService, mockBackend) => {
    mockBackend.connections.subscribe((connection) => {
    connection.mockRespond(new Response(new ResponseOptions({
      status:200 //Ok return
      })
    ));
   
      expect(connection.request.method).toEqual(RequestMethod.Put ,'should return with correct method');//RM-for checking type of request
    });  
      globalUserService.reject(13,{ assetId:'1', assetCode :'12',employeeCode:'22',companyCode:'33',description:'laptop',quantity:'44',location:'greater noida',capitalisationDate:'12/08/2017',assetStatus:'pending',assignedTo:'sunil',emailId:'lakshyamthur20@gmail.com'})
      .then((p)=>{console.log("reject"+p.status)
      expect(p.status).toBe(200);
    })
    }));                                                              //SEVENTH test case ends
});

  });                                                    //end of first describe