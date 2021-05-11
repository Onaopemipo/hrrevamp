import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrReviewMainComponent } from './hr-review-main.component';

describe('HrReviewMainComponent', () => {
  let component: HrReviewMainComponent;
  let fixture: ComponentFixture<HrReviewMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrReviewMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrReviewMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
