import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantonboardingComponent } from './tenantonboarding.component';

describe('TenantonboardingComponent', () => {
  let component: TenantonboardingComponent;
  let fixture: ComponentFixture<TenantonboardingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantonboardingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantonboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
