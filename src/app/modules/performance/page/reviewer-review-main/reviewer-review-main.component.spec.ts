import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewerReviewMainComponent } from './reviewer-review-main.component';

describe('ReviewerReviewMainComponent', () => {
  let component: ReviewerReviewMainComponent;
  let fixture: ComponentFixture<ReviewerReviewMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewerReviewMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewerReviewMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
