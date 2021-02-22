import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeofferComponent } from './employeeoffer.component';

describe('EmployeeofferComponent', () => {
  let component: EmployeeofferComponent;
  let fixture: ComponentFixture<EmployeeofferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeofferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeofferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
