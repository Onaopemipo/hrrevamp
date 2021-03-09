import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymenysetupComponent } from './paymenysetup.component';

describe('PaymenysetupComponent', () => {
  let component: PaymenysetupComponent;
  let fixture: ComponentFixture<PaymenysetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymenysetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymenysetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
