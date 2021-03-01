import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetirementformComponent } from './retirementform.component';

describe('RetirementformComponent', () => {
  let component: RetirementformComponent;
  let fixture: ComponentFixture<RetirementformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetirementformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetirementformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
