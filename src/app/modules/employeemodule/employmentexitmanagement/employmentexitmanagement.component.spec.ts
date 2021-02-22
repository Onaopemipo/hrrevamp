import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentexitmanagementComponent } from './employmentexitmanagement.component';

describe('EmploymentexitmanagementComponent', () => {
  let component: EmploymentexitmanagementComponent;
  let fixture: ComponentFixture<EmploymentexitmanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmploymentexitmanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploymentexitmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
