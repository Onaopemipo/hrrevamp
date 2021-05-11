import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceReviewMainComponent } from './performance-review-main.component';

describe('PerformanceReviewMainComponent', () => {
  let component: PerformanceReviewMainComponent;
  let fixture: ComponentFixture<PerformanceReviewMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformanceReviewMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceReviewMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
