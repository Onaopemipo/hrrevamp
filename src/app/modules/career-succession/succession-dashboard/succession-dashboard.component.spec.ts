import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessionDashboardComponent } from './succession-dashboard.component';

describe('SuccessionDashboardComponent', () => {
  let component: SuccessionDashboardComponent;
  let fixture: ComponentFixture<SuccessionDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessionDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
