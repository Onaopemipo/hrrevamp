import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayscalesetupComponent } from './payscalesetup.component';

describe('PayscalesetupComponent', () => {
  let component: PayscalesetupComponent;
  let fixture: ComponentFixture<PayscalesetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayscalesetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayscalesetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
