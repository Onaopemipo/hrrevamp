import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EligibilityxxComponent } from './eligibilityxx.component';

describe('EligibilityxxComponent', () => {
  let component: EligibilityxxComponent;
  let fixture: ComponentFixture<EligibilityxxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EligibilityxxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EligibilityxxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
