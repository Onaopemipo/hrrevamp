import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorReviewMainComponent } from './supervisor-review-main.component';

describe('SupervisorReviewMainComponent', () => {
  let component: SupervisorReviewMainComponent;
  let fixture: ComponentFixture<SupervisorReviewMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupervisorReviewMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorReviewMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
