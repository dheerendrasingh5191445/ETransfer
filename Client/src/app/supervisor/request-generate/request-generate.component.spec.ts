import { TestBed,ComponentFixture, async,fakeAsync,tick } from '@angular/core/testing';
import { DebugElement,NO_ERRORS_SCHEMA } from '@angular/core';
import { RequestGenerateComponent } from './request-generate.component';
import { By } from '@angular/platform-browser';
import { ActivatedRouteStub } from './../../shared/testing/router-stubs';

import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute,ParamMap } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Observable } from 'rxjs';
import { get }from 'http';

import { SupervisorService} from './../supervisor.service';
import {Employee} from './../../model/Employee';


describe('RequestGenerateComponent', () => {
  let component: RequestGenerateComponent;
  let fixture: ComponentFixture<RequestGenerateComponent>;
  let de :DebugElement;
  let debtn:DebugElement;
  let el :HTMLInputElement;
  let button :HTMLElement;
  let spy:jasmine.Spy;
  let activatedRoute:ActivatedRouteStub;
  let supervisormock:SupervisorService;
  let expectedEmployee:Employee;
  const employee:Employee = new Employee("222","ravi","ravi@gmail.com","london","ramesh","rajneesh","43","234","34",
                                        "43","234","cso","suresh","123456","234");

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    TestBed.configureTestingModule({
      declarations: [RequestGenerateComponent],
      imports:[ HttpModule,FormsModule, RouterTestingModule ],
      providers:[SupervisorService, {provide :ActivatedRoute,useValue:activatedRoute}],
      schemas:[NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestGenerateComponent);
    component = fixture.componentInstance;
    supervisormock = fixture.debugElement.injector.get(SupervisorService);

  });

  it('should create the request generate component', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should able to get the required list from backend', async(() => {
    spy=spyOn(supervisormock,"getmyemployeehere").and.returnValues(Promise.resolve(employee));
    fixture.detectChanges();
    fixture.whenStable().then(() => { 
      fixture.detectChanges();
      de=fixture.debugElement.query(By.css('#empid'));
      el=de.nativeElement;  
      expect(el.value).toBe("222");
      de=fixture.debugElement.query(By.css('#email'));
      el=de.nativeElement;  
      expect(el.value).toBe("ravi@gmail.com");
      de=fixture.debugElement.query(By.css('#empname'));
      el=de.nativeElement;  
      expect(el.value).toBe("ravi");
      de=fixture.debugElement.query(By.css('#location'));
      el=de.nativeElement;  
      expect(el.value).toBe("london");
      de=fixture.debugElement.query(By.css('#localcso'));
      el=de.nativeElement;  
      expect(el.value).toBe("rajneesh");
      de=fixture.debugElement.query(By.css('#sun'));
      el=de.nativeElement;  
      expect(el.textContent).toContain("Assign");
    });
  }));

  it('should have the correct employee code', fakeAsync(() => {
    spy=spyOn(supervisormock,"getmyemployeehere").and.returnValues(Promise.resolve(employee));
    expectedEmployee = employee;
    activatedRoute.testParamMap = { id: expectedEmployee.employeeCode };
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.myemployee.employeeName).toBe(expectedEmployee.employeeName);
    });
  }));
 
});
