import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestTypeComponent } from './interest-type.component';

describe('InterestTypeComponent', () => {
  let component: InterestTypeComponent;
  let fixture: ComponentFixture<InterestTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
