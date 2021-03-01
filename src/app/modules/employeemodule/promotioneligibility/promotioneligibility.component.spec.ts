import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotioneligibilityComponent } from './promotioneligibility.component';

describe('PromotioneligibilityComponent', () => {
  let component: PromotioneligibilityComponent;
  let fixture: ComponentFixture<PromotioneligibilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotioneligibilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotioneligibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
