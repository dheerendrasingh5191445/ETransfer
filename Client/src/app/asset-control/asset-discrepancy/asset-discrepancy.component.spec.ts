import { async, ComponentFixture, TestBed,fakeAsync,tick} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement ,NO_ERRORS_SCHEMA} from '@angular/core';
import{AssetControlService} from '../asset-control.service'
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'rxjs/add/Observable/of';
import{HttpModule} from '@angular/http'
import { AssetDiscrepancyComponent } from './asset-discrepancy.component';
import{AssetControllerDiscrepancyReport} from '../../model/assetDiscrepancyReport';
import { Observable } from 'rxjs/Rx';

let comp: AssetDiscrepancyComponent ;
let fixture: ComponentFixture<AssetDiscrepancyComponent>;
let de:      DebugElement;
let el:      HTMLElement;
let assetdiscrepancyService:AssetControlService;
let spy:jasmine.Spy;

//describe for component
describe('AssetDiscrepancyComponent', () => {

//mock asset discrepancy data
  let assetDis:AssetControllerDiscrepancyReport[]
  =
   [ {assetCode: '0000036772',
      requestId: '101' ,
      repEmployeeCode: '50042678' ,
      repEmployeeName: 'Kajal Agnihotri' ,
      sapEmployeeCode: '50042678' ,
      sapEmployeeName: 'Kajal Agnihotri' }]
  ;
  
//describe for getDiscrepancyReport method 
  describe('getDiscrepancyReport',()=>{
    beforeEach(async(() => {      //this will execute before execution of every it
      TestBed.configureTestingModule({   //with  help of configureTestingModule ,we can override pipes,declarations,imports 
        declarations: [ AssetDiscrepancyComponent ],
        imports:[HttpModule, FormsModule, NgxPaginationModule, HttpModule, BrowserAnimationsModule],
        providers:[AssetControlService],  //service
        schemas: [NO_ERRORS_SCHEMA]
      })
      .compileComponents(); //it will compile external templates,it is necessary to write this statement as this block is in async mode
    }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AssetDiscrepancyComponent); //it will create component 
    comp = fixture.componentInstance; //it will  create component instance  and fetch component data

    //assetdiscrepancy service  injected into component
    assetdiscrepancyService=fixture.debugElement.injector.get(AssetControlService); //it tells to get data from service

    //setup spy on the getDiscrepancyReport method
    spy=spyOn(assetdiscrepancyService,'getDiscrepancyReport').and.returnValue(Observable.of(assetDis));  //it will spyOn the getDiscrepancyReport function of assetcontrol service and will always return mock data
  
  });
  //test case for getDiscrepancy 
  it('get Discrepancy',fakeAsync(()=>{  //fakesync will pretend as if it is synchronous 
    fixture.detectChanges(); //test tells angular to detect changes
    tick();  //simulate the async passage of time untill all pending async activities finish
    fixture.detectChanges();
    expect(spy.calls.any()).toBe(true); //it expects  service function to be called
  })
  )
  //test that component exists 
  it('should create',()=>{
    expect(comp).toBeTruthy(); //expects component creation to be true
})

//test case to check whether  correct data is rendering to table or not 
it('should have filled the table with the correct data from service', fakeAsync(() => {
  
    fixture.detectChanges(); //tells angular to detect changes
    tick(); //will wait till all pending async activities finish 
    fixture.detectChanges();
    
    let assertId:string[]=[]; 
    
    fixture.debugElement.queryAll(By.css("#Request_ID")).forEach(n=>assertId.push(n.nativeElement.textContent)); //it will push all elements having  Request_ID in array assertId
     let counter=0;
     //each element in mockdata assetDis  will be matched with the element data
    assetDis.forEach(element => {  
          expect(assertId[counter]).toBe(element.requestId);
          counter++;
    });
     expect(assetDis.length).toBe(counter);  //match the length of mockData with the counter
 
  }))

//test case to check data is rendering properly on table 
it(' should render table data properly',fakeAsync(()=>{
fixture.detectChanges(); 
tick();//simulates the passage of time and wait till async activities are done
fixture.detectChanges();  
de = fixture.debugElement.query(By.css('#Request_ID')); //it will return the first element in html that have the id Request_ID and put into debug element
el = de.nativeElement; //insert the  native value returned by debugelement into html element

fixture.detectChanges();   
 expect(el.textContent).toBe("101");   //it expect the html element to contain  text 101
}))

//test case to check that  export function is called on button click  
it('should check the click of export to excel button', async(() => {
  let exp:jasmine.Spy =spyOn(assetdiscrepancyService, 'exportAsExcelFile'); //it will spy on the method exportAsExcelFile of service assetdiscrepancyService

  de = fixture.debugElement.query(By.css("#export"));  //it will return export button  to debug element
  el = de.nativeElement;
  el.click(); //click function on html element

  fixture.whenStable(); //will wait for async activities to finish
  fixture.detectChanges(); //tells angular to detect changes
  expect(exp.calls.any()).toBe(true); //expect that respective service function is called
}));


});
});
