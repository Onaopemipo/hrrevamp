import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeMasterSearchComponent } from './employee-master-search.component';

describe('EmployeeMasterSearchComponent', () => {
  let component: EmployeeMasterSearchComponent;
  let fixture: ComponentFixture<EmployeeMasterSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeMasterSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeMasterSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
