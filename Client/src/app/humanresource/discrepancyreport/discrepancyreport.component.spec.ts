import { async, ComponentFixture, TestBed,inject,fakeAsync,tick} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HrViewRequestService } from "../hr-viewrequest/hr-viewrequest.service";
import { DiscrepancyreportComponent } from './discrepancyreport.component';
import { Headers, HttpModule,  Http, Response,
  ResponseOptions,
  XHRBackend,
  RequestMethod } from '@angular/http';
import {TitleCasePipe,DatePipe} from '@angular/common';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/of";
import { Request } from '../../model/request';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {RouterModule} from '@angular/router';
import { MockBackend,MockConnection } from '@angular/http/testing';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { RouterTestingModule } from '@angular/router/testing';
import {Router} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{DiscrepancyReport}from '../../model/discrepancyReport';
class RouterStub {  //providing router stub
  navigate(url: string) { return url;  }
}
describe('DiscrepancyreportComponent', () => {
  let component: DiscrepancyreportComponent;
  let fixture: ComponentFixture<DiscrepancyreportComponent>;
  let hrSpyService:HrViewRequestService; 
  let pipeTitle=new TitleCasePipe;
  let date: DatePipe;
  let csoSpy: jasmine.Spy;
  let errorSpy:jasmine.Spy;
  let de:DebugElement;
  let el:HTMLElement;
 
  //stubbing the request data 
  let myReqList :any[]= [
   {"requestId":'4',"employeeCode":"500042984","supervisorCode":"23244","typeOfRequest":"location","newpacode":"3489","newpsacode":"34890","newOucode":"34934","newCcCode":"4339","dateOfRequest":"2017-12-09T00:00:00","requestStatus":"Approved","pendingWith":"Supervisor"}
  ];

  let mockdata:DiscrepancyReport[]=[
{ RequestId:"123",
     employeeCode:"1234",employeeName:"50042968", requestPa:"123",
    requestPsa:"1243",requestOu:"345",
     requestCc:"3453", sapPa:"456",
    sapPsa:"2355",sapOu:"235", sapCc:"1235"}
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpModule,FormsModule, NgxPaginationModule, HttpModule, RouterTestingModule, BrowserAnimationsModule],
      declarations: [DiscrepancyreportComponent],
      providers:[HrViewRequestService,  { provide: XHRBackend, useClass: MockBackend }] //providing injector
       
    })
    .compileComponents();
   
  }));
 
  
  beforeEach(() => {
    fixture = TestBed.createComponent(DiscrepancyreportComponent);
    component = fixture.componentInstance;
    // get the component's injected HRService
    hrSpyService=fixture.debugElement.injector.get(HrViewRequestService);
      
  });

//first test
  it('should create', () => {
    expect(component).toBeTruthy();
  });  //test that the component exist 

  //second test
  it('should render `View Request`  in a h4 tag', async(() => {
     const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h4').textContent).toContain('View Request'); //check  that the HR header displays on h3 tag
  }));

 //third test
  it('should have called `getDiscrepancyReport`',fakeAsync(()=>{
    csoSpy =spyOn(hrSpyService,'getDiscrepancyReport').and.returnValue(Observable.of(myReqList));
   
    tick();//simulates the passage of time until all pending asynchronous activities finish
  
    fixture.detectChanges(); //update the dom
    expect(csoSpy.calls.any()).toBe(true); //check that service is called
  }));

  //Fourth test
  it('should have called `getRequestDetailfromHTMLindiscrepancy',fakeAsync(()=>{
    fixture.detectChanges();
    component.report = mockdata; //supplying data to component 
   tick();
   fixture.detectChanges();
   de = fixture.debugElement.query(By.css('#button-clicked')); // Event of click on button
   el = de.nativeElement;
   el.click();
   expect(component.requestPa).toBe("123"); // checking the data to be equal
    
  }));

//fifth test
  it('should have called search via name', fakeAsync(() => {
    
        fixture.detectChanges();
        component.searchTerm = 'param';

        tick();//simulates the passage of time until all pending asynchronous activities finish
        
        fixture.detectChanges(); //update the dom
        de = fixture.debugElement.query(By.css('#search')); //Extracting search id from html
        el = de.nativeElement;
        expect(el.attributes['ng-reflect-model'].value).toBe('param'); //checking the name to be equal

      }));
  
//sixth test
   it('should have called search via name in upper case',fakeAsync(()=>{
   
   fixture.detectChanges();
   component.searchTerm='param';

    tick();//simulates the passage of time until all pending asynchronous activities finish

    fixture.detectChanges(); //update the dom
    de = fixture.debugElement.query(By.css('#search'));
    el = de.nativeElement;
   expect(el.attributes['ng-reflect-model'].value).toBe('param'); //check that service is called
  
   component.search() 
   expect(component.term).toBe('PARAM'); //checking the name to be equal
   
 }));

 //seventh test
  it('should have called search via code',fakeAsync(()=>{
   fixture.detectChanges();
   component.searchTerm='500';
    component.report=mockdata;
    tick();//simulates the passage of time until all pending asynchronous activities finish
    
    fixture.detectChanges(); //update the dom
    de = fixture.debugElement.query(By.css('#search'));
    el = de.nativeElement;
   expect(el.attributes['ng-reflect-model'].value).toBe('500'); //check that service is called
   component.search() 
   expect(component.term).toBe('500'); //checking the employee code to be equal
   
 }));

});