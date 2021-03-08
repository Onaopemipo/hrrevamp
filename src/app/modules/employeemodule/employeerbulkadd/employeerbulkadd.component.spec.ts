import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeerbulkaddComponent } from './employeerbulkadd.component';

describe('EmployeerbulkaddComponent', () => {
  let component: EmployeerbulkaddComponent;
  let fixture: ComponentFixture<EmployeerbulkaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeerbulkaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeerbulkaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
