import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeeventsComponent } from './employeeevents.component';

describe('EmployeeeventsComponent', () => {
  let component: EmployeeeventsComponent;
  let fixture: ComponentFixture<EmployeeeventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeeventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeeventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
