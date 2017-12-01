/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserControlComponent } from './user-control.component';

describe('UserControlComponent', () => {
  let component: UserControlComponent;
  let fixture: ComponentFixture<UserControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
