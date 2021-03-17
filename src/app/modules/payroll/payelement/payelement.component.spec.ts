import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayelementComponent } from './payelement.component';

describe('PayelementComponent', () => {
  let component: PayelementComponent;
  let fixture: ComponentFixture<PayelementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayelementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayelementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
