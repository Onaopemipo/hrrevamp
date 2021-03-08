import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeerecordsComponent } from './employeerecords.component';

describe('EmployeerecordsComponent', () => {
  let component: EmployeerecordsComponent;
  let fixture: ComponentFixture<EmployeerecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeerecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeerecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
