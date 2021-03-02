import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeedeploymentmanagementComponent } from './employeedeploymentmanagement.component';

describe('EmployeedeploymentmanagementComponent', () => {
  let component: EmployeedeploymentmanagementComponent;
  let fixture: ComponentFixture<EmployeedeploymentmanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeedeploymentmanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeedeploymentmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
