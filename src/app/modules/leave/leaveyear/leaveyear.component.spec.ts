import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveyearComponent } from './leaveyear.component';

describe('LeaveyearComponent', () => {
  let component: LeaveyearComponent;
  let fixture: ComponentFixture<LeaveyearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveyearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveyearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
