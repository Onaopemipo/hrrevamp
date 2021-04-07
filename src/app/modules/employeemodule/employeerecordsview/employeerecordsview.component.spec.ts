import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeerecordsviewComponent } from './employeerecordsview.component';

describe('EmployeerecordsviewComponent', () => {
  let component: EmployeerecordsviewComponent;
  let fixture: ComponentFixture<EmployeerecordsviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeerecordsviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeerecordsviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
