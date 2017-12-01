import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedassetassignComponent } from './rejectedassetassign.component';

describe('RejectedassetassignComponent', () => {
  let component: RejectedassetassignComponent;
  let fixture: ComponentFixture<RejectedassetassignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectedassetassignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedassetassignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
