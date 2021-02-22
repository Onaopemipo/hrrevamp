import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeepersonalinformationComponent } from './employeepersonalinformation.component';

describe('EmployeepersonalinformationComponent', () => {
  let component: EmployeepersonalinformationComponent;
  let fixture: ComponentFixture<EmployeepersonalinformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeepersonalinformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeepersonalinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
