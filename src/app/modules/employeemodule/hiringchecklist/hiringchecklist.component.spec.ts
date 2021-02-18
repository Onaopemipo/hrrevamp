import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringchecklistComponent } from './hiringchecklist.component';

describe('HiringchecklistComponent', () => {
  let component: HiringchecklistComponent;
  let fixture: ComponentFixture<HiringchecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiringchecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiringchecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
