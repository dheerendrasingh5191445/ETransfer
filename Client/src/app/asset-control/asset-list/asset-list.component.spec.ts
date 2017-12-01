/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed , fakeAsync , tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination'
import { AssetListComponent } from './asset-list.component';
import{BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AssetControlService } from '../asset-control.service';
import{HttpModule} from '@angular/http';
import {AssetsData} from '../../model/asset';

const List:any ={  
  "assetCode": 9877,
  "employeeCode": 12156959, 
  "companyCode": 34754,
  "description": "laptop",
  "quantity": 1,
  "location": "delhi",
  "capitalisationDate": "12/03/2017",
  "assetStatus": "pending",
  
 } 

 //test suite
describe('AssetListComponent', () => {
  let component: AssetListComponent;
  let fixture: ComponentFixture<AssetListComponent>;
  let assetControlService:AssetControlService;
  let spy:jasmine.Spy;
  let update:jasmine.Spy;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({  //configuring testing module
      declarations: [ AssetListComponent ],
      imports:[NgxPaginationModule ,BrowserAnimationsModule , HttpModule],
      providers: [
      AssetControlService
     ]
    })
    .compileComponents(); //compiling the template and all the required modules
  }));

  beforeEach(() => { //creating component instance
    fixture = TestBed.createComponent(AssetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    //injecting the service 
    assetControlService = fixture.debugElement.injector.get(AssetControlService) ;
    // setting up spy on the getmypendingrequestlist method of assetController service 
    spy = spyOn(assetControlService , 'GetAssetList').and.returnValue(Promise.resolve(List));
   
    de = fixture.debugElement.query(By.css('.wrapper'));
    el=de.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have called ngOninit ', fakeAsync(() => {
    
   fixture.detectChanges();
   tick();
   fixture.detectChanges();
   expect(spy.calls.count()).toBe(1);

  }))
  
});
