import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantSelectionComponent } from './applicant-selection.component';

describe('ApplicantSelectionComponent', () => {
  let component: ApplicantSelectionComponent;
  let fixture: ComponentFixture<ApplicantSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
