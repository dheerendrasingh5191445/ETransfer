//importing all the dependencies
import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CsoService } from "../cso.service";
import { ApprovalListComponent } from './approval-list.component';
import { Headers, HttpModule, Http, Response, ResponseOptions, XHRBackend, RequestMethod } from '@angular/http';
import { TitleCasePipe, DatePipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/of";
import { Request } from '../../model/request';
import { AssetsData } from '../../model/asset';
import { RouterModule } from '@angular/router';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//stubbing the router for navigation to error page
class RouterStub {
    navigate(url: string) { return url; }
}
//the test suite for the approval list component
describe('ApprovalListComponent', () => {
    let component: ApprovalListComponent;
    let fixture: ComponentFixture<ApprovalListComponent>;
    //object for the service used
    let csoSpyService: CsoService;
    let pipeTitle = new TitleCasePipe; //to check the title case pipe
    let date: DatePipe; //to check the date pipe
    //test doubles
    let csoSpy: jasmine.Spy;
    let secondSpy: jasmine.Spy;
    let thirdSpy: jasmine.Spy;
    let de: DebugElement;
    let el: HTMLElement;
    //stubbing the request data 
    let myReqList: any[] = [
        { "requestStatus": "pending", "employeeName": "riya", "employeeCode": "500042984", "supervisorCode": "23244", "typeOfRequest": "location", "newPaCode": "3489", "newPsaCode": "34890", "newOuCode": "34934", "newCcCode": "4339", "dateOfRequest": '2017-12-09T00:00:00', "pendingWith": "Supervisor", "DateOfCompletionRequest": "2017-12-09T00:00:00", "dateOftransfer": "2017/18/09" }
    ];
    //stubbing the  asset data
    let myAssetDetail: AssetsData[] =
        [
            {
                "assetId": "1",
                "assetCode": "3455",
                "employeeCode": "12156959",
                "companyCode": "34754",
                "description": "laptop",
                "quantity": "1",
                "location": "delhi",
                "capitalisationDate": "12/03/2017",
                "assetStatus": "pending",
                "emailId": "er.alruba2017@gmail.com",
                "reassignedTo": "193503"
            }
        ]
        ;
    //configuring the pre configuration required before running the test suite
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            //importing the dependent modules
            imports: [HttpModule, FormsModule, NgxPaginationModule, HttpModule, RouterTestingModule, BrowserAnimationsModule],
            //declaring the components used
            declarations: [ApprovalListComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            //injecting the dependency, required by the component
            providers: [CsoService, { provide: Router, useClass: RouterStub }]
        })
            .compileComponents();
    }));
    //configuring before each spec runs
    beforeEach(() => {
        fixture = TestBed.createComponent(ApprovalListComponent);
        component = fixture.componentInstance;
        // get the component's injected CsoService
        csoSpyService = fixture.debugElement.injector.get(CsoService);
        //spy on getViewAllRequest
        csoSpy = spyOn(csoSpyService, 'getViewAllRequest').and.returnValue(Observable.of(myReqList));
        //spy on getAssetDetailsByCode
        secondSpy = spyOn(csoSpyService, 'getAssetDetailsByCode').and.returnValue(Observable.of(myAssetDetail));
        //spy on updateApprovalStatus
        thirdSpy = spyOn(csoSpyService, 'updateApprovalStatus').and.returnValues(Observable.of(myReqList));
    });
    //first test
    it('should create', () => {
        expect(component).toBeTruthy();
    });  //test that the component exist 
    //second test
    it('should render Pending Requests For Approval   in a h4 tag', async(() => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h4').textContent).toContain('Pending Requests For Approval  '); //check  that the cso clearance data header displays on h3 tag
    }));
    //third test
    it('should have called `getViewAllRequest`', fakeAsync(() => {
        fixture.detectChanges();
        tick();//simulates the passage of time until all pending asynchronous activities finish
        fixture.detectChanges(); //update the dom
        expect(csoSpy.calls.any()).toBe(true); //check that service is called
    }));
    //fourth test to  check the 
    it('should have called `getAssetDetailsByCode`', async(() => {
        fixture.detectChanges();
        fixture.whenStable();
        component.getAssetDetails('3455');
        fixture.detectChanges();
        expect(secondSpy.calls.any()).toBe(true); //checking if the servce is called from the component
        console.log(myAssetDetail);
    }));
    it('should render proper values in the table', fakeAsync(() => {
        // query for  by CSS element selector     
        fixture.detectChanges();
        tick();
        de = fixture.debugElement.query(By.css('#typereq'));
        el = de.nativeElement;
        fixture.detectChanges();
        expect(el.textContent).toBe("pending");
    }));
    //for the positive case
    it('should check the titlecasepipe', (() => {
        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('#name'));
        el = de.nativeElement;
        expect(el.textContent).toBe(pipeTitle.transform('500042984:riya'));
        fixture.detectChanges();
    }));
    //positive test case for checking the Date pipe 
    it('should check the Datepipe', inject([DatePipe], (datePipe) => {
        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('#datereq'));
        el = de.nativeElement;
        expect(el.textContent).toBe(datePipe.transform('2017-12-09T00:00:00'));
        fixture.detectChanges();
    }));
    //checking the modal functionality in positive case
    it('should check the modal opens on click', async(() => {
        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('.mod'));
        el = de.nativeElement;
        el.click();
        fixture.whenStable();
        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('.modal'));
        el = de.nativeElement;
        expect(el).toBeTruthy();
    }));
    it('should click `approveUserRequest`', async(() => {
        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('.updatebtn'));
        el = de.nativeElement;
        el.click();
        fixture.whenStable();
        fixture.detectChanges();
        //checking for the spy calling and checking for the count of the calls 
        expect(thirdSpy.calls.count()).toBe(1, "approveuser called once");
    }));
});
