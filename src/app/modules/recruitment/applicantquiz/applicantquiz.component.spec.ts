import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantquizComponent } from './applicantquiz.component';

describe('ApplicantquizComponent', () => {
  let component: ApplicantquizComponent;
  let fixture: ComponentFixture<ApplicantquizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantquizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantquizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
