/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HumanresourceComponent } from './humanresource.component';

describe('HumanresourceComponent', () => {
  let component: HumanresourceComponent;
  let fixture: ComponentFixture<HumanresourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HumanresourceComponent ],
      imports:[RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HumanresourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
