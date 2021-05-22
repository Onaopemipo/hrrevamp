import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitdetaisComponent } from './benefitdetais.component';

describe('BenefitdetaisComponent', () => {
  let component: BenefitdetaisComponent;
  let fixture: ComponentFixture<BenefitdetaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenefitdetaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenefitdetaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
