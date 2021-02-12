import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantssigninComponent } from './applicantssignin.component';

describe('ApplicantssigninComponent', () => {
  let component: ApplicantssigninComponent;
  let fixture: ComponentFixture<ApplicantssigninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantssigninComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantssigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
