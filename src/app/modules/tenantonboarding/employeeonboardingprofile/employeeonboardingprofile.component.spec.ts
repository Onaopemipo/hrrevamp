import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeonboardingprofileComponent } from './employeeonboardingprofile.component';

describe('EmployeeonboardingprofileComponent', () => {
  let component: EmployeeonboardingprofileComponent;
  let fixture: ComponentFixture<EmployeeonboardingprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeonboardingprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeonboardingprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
