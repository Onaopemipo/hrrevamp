import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingemployeesComponent } from './onboardingemployees.component';

describe('OnboardingemployeesComponent', () => {
  let component: OnboardingemployeesComponent;
  let fixture: ComponentFixture<OnboardingemployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardingemployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardingemployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
