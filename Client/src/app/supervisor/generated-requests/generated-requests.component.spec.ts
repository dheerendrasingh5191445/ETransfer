import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedRequestsComponent } from './generated-requests.component';

describe('GeneratedRequestsComponent', () => {
  let component: GeneratedRequestsComponent;
  let fixture: ComponentFixture<GeneratedRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratedRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratedRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
