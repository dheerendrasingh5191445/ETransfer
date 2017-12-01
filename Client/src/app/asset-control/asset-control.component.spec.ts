/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed,fakeAsync,tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import{RouterLinkStubDirective,RouterOutletStubComponent } from'../shared/testing/router-stubs'
import { AssetControlComponent } from './asset-control.component';
import{Router} from '@angular/router';
import { AssetControlService } from './asset-control.service';
import{HttpModule} from'@angular/http'


class routerStub{
  navigate(url:any){
    return url;
  }
}

//test suite
describe('AssetControlComponent', () => {
  let component: AssetControlComponent;
  let fixture: ComponentFixture<AssetControlComponent>;
  let de:DebugElement;
  let el: HTMLElement;
  let assestservice:AssetControlService;
  let spy:any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ //configuring testing module
      declarations: [ AssetControlComponent,RouterLinkStubDirective,RouterOutletStubComponent],
      imports:[HttpModule],
      providers:[
        AssetControlService, //provider for service
        {provide:Router,useClass:routerStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetControlComponent); //creating instance
    component = fixture.componentInstance;
    fixture.detectChanges();
    assestservice=TestBed.get(AssetControlService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should check toggle function' , () =>{
    
        fixture.detectChanges();
    
        de = fixture.debugElement.query(By.css('.navbar-toggler'));
        el = de.nativeElement;
        el.click();
       
                fixture.detectChanges();      
     
      }) ;
});
