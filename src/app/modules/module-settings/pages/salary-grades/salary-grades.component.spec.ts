import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryGradesComponent } from './salary-grades.component';

describe('SalaryGradesComponent', () => {
  let component: SalaryGradesComponent;
  let fixture: ComponentFixture<SalaryGradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryGradesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
