import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailOTPVerifyComponent } from './email-otpverify.component';

describe('EmailOTPVerifyComponent', () => {
  let component: EmailOTPVerifyComponent;
  let fixture: ComponentFixture<EmailOTPVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailOTPVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailOTPVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
