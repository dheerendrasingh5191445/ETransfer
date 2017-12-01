import { async, ComponentFixture, TestBed ,  fakeAsync,  tick , inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement }    from '@angular/core';
import { By }              from '@angular/platform-browser';
import { Observable }     from 'rxjs/Observable';
import{ Router } from '@angular/router';
import 'rxjs/add/Observable/of';

import {HttpModule, Http, Response, ResponseOptions, XHRBackend} from '@angular/http';
import { FormsModule } from '@angular/forms';
import { MockBackend } from '@angular/http/testing';
import { GlobalUserviewComponent } from './../global-userview/global-userview.component';
import {GlobalUserService} from './../global-userview/globaluser.service';

import{AssetsData} from '../../../model/asset';
import {NgxPaginationModule} from 'ngx-pagination';
import { NO_ERRORS_SCHEMA } from  '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
const mockResponse =                         //Response being mocked for testing
[
 { assetId: 0, assetCode: 4,description:'laptop',employeeCode:'8',quantity:'9'},
 { assetId: 1, assetCode: 5,description: 'laptop',employeeCode:'8',quantity:'9'},
 { assetId: 2, assetCode: 6,description:'laptop',employeeCode:'8',quantity:'9'},
 { assetId: 3, assetCode: 7,description:'laptop',employeeCode:'8',quantity:'9' } 
];																						//end of mock response
describe('Accepted Request History of Global User', () => {                  //start of first describe
   let spyAcceptedRequest: jasmine.Spy;                        /*variables declared for describe*/
   let fixture: ComponentFixture<GlobalUserviewComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;
let comp:    GlobalUserviewComponent;
  let globalUserService:GlobalUserService;
  

  var Data:AssetsData[]=[{															//mocking  AssetsData array in Data
    assetId:"1",
    assetCode: "9877",
    employeeCode: "12156959", 
    companyCode: "34754",
    description: "laptop",
    quantity: "1",
    location: "delhi",
    capitalisationDate: "Dec 3, 2017",
    assetStatus: "pending",
    emailId: "er.alruba2017@gmail.com",
    reassignedTo:"193503"

  }];																									//end of mock AssetsData
  beforeEach(async(()=>{															//start of first before each
    TestBed.configureTestingModule({
      imports:[HttpModule,FormsModule,NgxPaginationModule,
      RouterTestingModule,BrowserAnimationsModule],
      declarations:[GlobalUserviewComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers:[GlobalUserService]
    })
    .compileComponents()
  }));																								//end of first before each
    
    beforeEach(()=>{
 
      fixture=TestBed.createComponent(GlobalUserviewComponent);/* creates a module that overrides the actual dependencies with testing dependencies*/

      comp=fixture.componentInstance;
      globalUserService=fixture.debugElement.injector.get(GlobalUserService);  //injecting real service to a variable
     
     spyAcceptedRequest=spyOn(globalUserService,'getMyAcceptedRequest') //spying the real service on getMyAcceptedRequest method
      .and.returnValue(Observable.of(Data));

it('employee list should return from service the accepted requests', fakeAsync(()=>{  //FIRST test case begins
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(spyAcceptedRequest.calls.any()).toEqual(true);
}));																									//FIRST test case ends

it('Values Should be displayed on HTML page',  fakeAsync(()=>{    //SECOND test case begins

  fixture.detectChanges();
  tick();
 
  de=fixture.debugElement.query(By.css('#capDate'));
  el=de.nativeElement; 
  fixture.detectChanges();
  expect(el.textContent).toBe("Dec 3, 2017");

  de=fixture.debugElement.query(By.css('#compCode'));
  el=de.nativeElement; 
  fixture.detectChanges();
  expect(el.textContent).toBe("34754");

  de=fixture.debugElement.query(By.css('#assetCode'));
  el=de.nativeElement; 
  fixture.detectChanges();
  expect(el.textContent).toBe("9877");

  de=fixture.debugElement.query(By.css('#description'));
  el=de.nativeElement; 
  fixture.detectChanges();
  expect(el.textContent).toBe("laptop");

  de=fixture.debugElement.query(By.css('#employeeCode'));
  el=de.nativeElement; 
  fixture.detectChanges();
  expect(el.textContent).toBe("12156959");
  
  de=fixture.debugElement.query(By.css('#location'));
  el=de.nativeElement; 
  fixture.detectChanges();
  expect(el.textContent).toBe("delhi");
}));																													//SECOND test case ends

 });
    describe('getMyAcceptedRequests()', () => {								//start of second describe

  it('should return an Observable<Array<assetCode>',					//THIRD test case begins
  inject([GlobalUserService, XHRBackend], (GlobalUserService, mockBackend) => {
  
  mockBackend.connections.subscribe((connection) => {
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
}));																																//THIRD test  case ends
});																																//end of second describe
  });  																														//end of first describe