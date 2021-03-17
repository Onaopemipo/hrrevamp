import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayscaletableComponent } from './payscaletable.component';

describe('PayscaletableComponent', () => {
  let component: PayscaletableComponent;
  let fixture: ComponentFixture<PayscaletableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayscaletableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayscaletableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
