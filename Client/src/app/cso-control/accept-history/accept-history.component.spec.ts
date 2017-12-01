/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed,inject,fakeAsync,tick} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CsoService } from "../cso.service";
import { AcceptHistoryComponent } from './accept-history.component';
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
class RouterStub {
  navigate(url: string) { return url;  }
}
describe('AcceptHistoryComponent', () => {
  let component: AcceptHistoryComponent;
  let fixture: ComponentFixture<AcceptHistoryComponent>;
  let csoSpyService:CsoService; 
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


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpModule,FormsModule, NgxPaginationModule, HttpModule, RouterTestingModule, BrowserAnimationsModule],
      declarations: [AcceptHistoryComponent],
      providers:[CsoService,DatePipe,{provide:Router, useClass:RouterStub},  { provide: XHRBackend, useClass: MockBackend }]
       
    })
    .compileComponents();
   
  }));
 
  
  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptHistoryComponent);
    component = fixture.componentInstance;
    
    // get the component's injected CsoService
    csoSpyService=fixture.debugElement.injector.get(CsoService);
  
  });
//first test
  it('should create', () => {
    expect(component).toBeTruthy();
  });  //test that the component exist 
  //second test
  it('should render Requests Aproved By Me  in a h4 tag', async(() => {
   
     const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h4').textContent).toContain('Requests Aproved By Me'); //check  that the cso clearance data header displays on h3 tag
  }));
//third test
  it('should have called `getViewApprovedRequest`',fakeAsync(()=>{
    csoSpy =spyOn(csoSpyService,'getViewApprovedRequest').and.returnValue(Observable.of(myReqList));
   
    tick();//simulates the passage of time until all pending asynchronous activities finish
  
    fixture.detectChanges(); //update the dom
    expect(csoSpy.calls.any()).toBe(true); //check that service is called

  }));
 



  it('should render proper values in the table',fakeAsync(()=>{
          // query for  by CSS element selector     
      
     csoSpy =spyOn(csoSpyService,'getViewApprovedRequest').and.returnValue(Observable.of(myReqList));
     tick();
      fixture.detectChanges(); 
      de = fixture.debugElement.query(By.css('#typereq'));
      el = de.nativeElement;
      fixture.detectChanges();   
       expect(el.textContent).toBe("Approved");
  }));

  it('should check the Datepipe',inject ([DatePipe],(datePipe)=>{
    csoSpy =spyOn(csoSpyService,'getViewApprovedRequest').and.returnValue(Observable.of(myReqList));
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('#datereq'));
    el = de.nativeElement;
    expect(el.textContent).toBe(datePipe.transform('2017-12-09T00:00:00'));
    fixture.detectChanges();
  }));

  it('Should handle the error ',fakeAsync( inject([Router,CsoService, XHRBackend], (router,csoSpyService, mockBackend) => {
    const spy4 = spyOn(router, 'navigate');
    var req=fixture.debugElement.injector.get(CsoService);
    fixture.detectChanges();
   
   tick();
   fixture.detectChanges();
   
    mockBackend.connections.subscribe((connection) => {
      connection.mockError(new Response(new ResponseOptions({
        body: {error: '404'},status:404
      })));
   
    
    });
    component.ngOnInit();
    
    const navArgs = spy4.calls.first().args[0];
    console.log(navArgs);        
    expect("/error-handle/404").toContain(navArgs)
   
   
   })));



});
