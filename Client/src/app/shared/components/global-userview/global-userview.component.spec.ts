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
import { GlobalUserviewComponent } from './global-userview.component';
import {GlobalUserService} from './globaluser.service';

import{AssetsData} from '../../../model/asset';
import {NgxPaginationModule} from 'ngx-pagination';
import { NO_ERRORS_SCHEMA } from  '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('GlobalUserviewComponent', () => {          //First describe STARTS
  let comp:    GlobalUserviewComponent;
  let globalUserService:GlobalUserService;
  let spyPendingRequest: jasmine.Spy;
  let spyAcceptedRequest: jasmine.Spy;
  let spyapprove:jasmine.Spy;
  let spyreject:jasmine.Spy;
  let fixture: ComponentFixture<GlobalUserviewComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;
 
  var Data:AssetsData[]=[{                        //mock data of Assetsdata type
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

  }];                                            //end of mock data
  beforeEach(async(()=>{                          //First before each BEGINS
    TestBed.configureTestingModule({              /* creates a module that overrides the actual dependencies with testing dependencies*/

      imports:[HttpModule,FormsModule,NgxPaginationModule,            //modules imported
      RouterTestingModule,BrowserAnimationsModule],

      declarations:[GlobalUserviewComponent],                        //declaring modules being imported
      schemas: [NO_ERRORS_SCHEMA],                                    //defining the schemas
      providers:[GlobalUserService]                                //providing the real service
    })
    .compileComponents()}));                      //First before each ENDS
    
    beforeEach(()=> {                              //Second before each BEGINS
 
      fixture=TestBed.createComponent(GlobalUserviewComponent);

      comp=fixture.componentInstance;
      globalUserService=fixture.debugElement.injector.get(GlobalUserService);  //injecting real service 
      
      spyPendingRequest=spyOn(globalUserService,'getMyPendingRequest')       /*spying on GlobalUserService 
                                                                             on getMyPendingRequest method */
      .and.returnValue(Observable.of(Data));
      
      spyAcceptedRequest=spyOn(globalUserService,'getMyAcceptedRequest')  /*spying on GlobalUserService 
                                                                             on getMyAcceptedRequest method */
      .and.returnValue(Observable.of(Data));

      spyapprove=spyOn(globalUserService,'approve')                        /*spying on GlobalUserService 
                                                                             on approve method */
      .and.returnValue(new Promise(res=>true));
      
      spyreject=spyOn(globalUserService,'reject')                          /*spying on GlobalUserService 
                                                                             on reject method */
      .and.returnValue(new Promise(res=>false));
      comp.itemsCopy=Data;
      comp.myPendingAssetRequest=Data;
       });                                          //Second before each ENDS

    it('employee list should return from service the pending requests', fakeAsync(()=>{    //FIRST test case BEGINS
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(spyPendingRequest.calls.any()).toEqual(true);
}));                                                                //FIRST test case ENDS

 it('employee list should return from service the accepted requests', fakeAsync(()=>{     //SECOND test case BEGINS
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(spyAcceptedRequest.calls.any()).toEqual(true);
}));                                                                                //SECOND test case ENDS

it('Values Should be displayed on HTML page',  fakeAsync(()=>{             //THIRD test case BEGINS

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
}));                                                  //THIRD test case ENDS

it('reject is returning true',fakeAsync(()=>{          //FOURTH test case BEGINS
  fixture.detectChanges();
 tick();
 fixture.detectChanges();
 de=fixture.debugElement.query(By.css('#reject'));

  el=de.nativeElement;
  el.click();
  fixture.detectChanges();
  expect(spyreject.calls.any()).toEqual(true);
}));                                                //FOURTH test case ENDS

it('approve is returning true',fakeAsync(()=>{     //FIFTH test case BEGINS
  fixture.detectChanges();
  tick();
  fixture.detectChanges();
  de=fixture.debugElement.query(By.css('#accept'));
el=de.nativeElement;
el.click();
  
  fixture.detectChanges();
  expect(spyapprove.calls.any()).toEqual(true);
}));                                             //FIFTH test case ENDS

});