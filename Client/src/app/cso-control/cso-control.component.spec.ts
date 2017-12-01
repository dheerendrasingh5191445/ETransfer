/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Http, HttpModule } from '@angular/http';
import {Router} from '@angular/router';
import {  NO_ERRORS_SCHEMA } from '@angular/core';
import { CsoControlComponent } from './cso-control.component';

class RouterStub {
  navigate(url: string) { return url;  }
}
describe('CsoControlComponent', () => {
  let component: CsoControlComponent;
  let fixture: ComponentFixture<CsoControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsoControlComponent ],
      schemas:[NO_ERRORS_SCHEMA ],
      imports: [  HttpModule, RouterTestingModule],
      providers: [{provide:Router, useClass:RouterStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsoControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
