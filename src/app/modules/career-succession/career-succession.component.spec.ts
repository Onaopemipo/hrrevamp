import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerSuccessionComponent } from './career-succession.component';

describe('CareerSuccessionComponent', () => {
  let component: CareerSuccessionComponent;
  let fixture: ComponentFixture<CareerSuccessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerSuccessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerSuccessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
