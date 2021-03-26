import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SucessionPlanDetailComponent } from './sucession-plan-detail.component';

describe('SucessionPlanDetailComponent', () => {
  let component: SucessionPlanDetailComponent;
  let fixture: ComponentFixture<SucessionPlanDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SucessionPlanDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SucessionPlanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
