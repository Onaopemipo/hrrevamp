import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewerdashboardComponent } from './interviewerdashboard.component';

describe('InterviewerdashboardComponent', () => {
  let component: InterviewerdashboardComponent;
  let fixture: ComponentFixture<InterviewerdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewerdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewerdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
