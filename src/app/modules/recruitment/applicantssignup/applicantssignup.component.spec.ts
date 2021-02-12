import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantssignupComponent } from './applicantssignup.component';

describe('ApplicantssignupComponent', () => {
  let component: ApplicantssignupComponent;
  let fixture: ComponentFixture<ApplicantssignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantssignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantssignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
