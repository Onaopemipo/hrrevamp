import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrReviewListComponent } from './hr-review-list.component';

describe('HrReviewListComponent', () => {
  let component: HrReviewListComponent;
  let fixture: ComponentFixture<HrReviewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrReviewListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrReviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
