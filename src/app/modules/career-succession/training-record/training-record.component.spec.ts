import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingRecordComponent } from './training-record.component';

describe('TrainingRecordComponent', () => {
  let component: TrainingRecordComponent;
  let fixture: ComponentFixture<TrainingRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
