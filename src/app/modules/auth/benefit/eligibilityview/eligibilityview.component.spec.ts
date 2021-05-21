import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EligibilityviewComponent } from './eligibilityview.component';

describe('EligibilityviewComponent', () => {
  let component: EligibilityviewComponent;
  let fixture: ComponentFixture<EligibilityviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EligibilityviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EligibilityviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
