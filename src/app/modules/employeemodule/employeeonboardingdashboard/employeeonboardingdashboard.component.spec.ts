import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeonboardingdashboardComponent } from './employeeonboardingdashboard.component';

describe('EmployeeonboardingdashboardComponent', () => {
  let component: EmployeeonboardingdashboardComponent;
  let fixture: ComponentFixture<EmployeeonboardingdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeonboardingdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeonboardingdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
