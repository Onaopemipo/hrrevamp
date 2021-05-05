import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCompetencyComponent } from './new-competency.component';

describe('NewCompetencyComponent', () => {
  let component: NewCompetencyComponent;
  let fixture: ComponentFixture<NewCompetencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCompetencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCompetencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
