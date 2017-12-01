import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NiitianComponent } from './niitian.component';

describe('NiitianComponent', () => {
  let component: NiitianComponent;
  let fixture: ComponentFixture<NiitianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NiitianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NiitianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
