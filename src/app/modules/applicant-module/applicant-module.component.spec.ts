import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantModuleComponent } from './applicant-module.component';

describe('ApplicantModuleComponent', () => {
  let component: ApplicantModuleComponent;
  let fixture: ComponentFixture<ApplicantModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
