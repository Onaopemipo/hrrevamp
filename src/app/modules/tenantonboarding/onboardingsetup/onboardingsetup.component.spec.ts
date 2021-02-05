import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingsetupComponent } from './onboardingsetup.component';

describe('OnboardingsetupComponent', () => {
  let component: OnboardingsetupComponent;
  let fixture: ComponentFixture<OnboardingsetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardingsetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardingsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
