import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetassignComponent } from './assetassign.component';

describe('AssetassignComponent', () => {
  let component: AssetassignComponent;
  let fixture: ComponentFixture<AssetassignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetassignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetassignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
