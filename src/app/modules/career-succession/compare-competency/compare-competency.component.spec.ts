import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareCompetencyComponent } from './compare-competency.component';

describe('CompareCompetencyComponent', () => {
  let component: CompareCompetencyComponent;
  let fixture: ComponentFixture<CompareCompetencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareCompetencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareCompetencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
