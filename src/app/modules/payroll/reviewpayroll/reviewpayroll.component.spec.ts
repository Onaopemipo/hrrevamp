import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewpayrollComponent } from './reviewpayroll.component';

describe('ReviewpayrollComponent', () => {
  let component: ReviewpayrollComponent;
  let fixture: ComponentFixture<ReviewpayrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewpayrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewpayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
