import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetKpiComponent } from './set-kpi.component';

describe('SetKpiComponent', () => {
  let component: SetKpiComponent;
  let fixture: ComponentFixture<SetKpiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetKpiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
