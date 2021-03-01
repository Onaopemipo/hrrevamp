import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantselectionComponent } from './applicantselection.component';

describe('ApplicantselectionComponent', () => {
  let component: ApplicantselectionComponent;
  let fixture: ComponentFixture<ApplicantselectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantselectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
