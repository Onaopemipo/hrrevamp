import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SucessionPlanCreateComponent } from './sucession-plan-create.component';

describe('SucessionPlanCreateComponent', () => {
  let component: SucessionPlanCreateComponent;
  let fixture: ComponentFixture<SucessionPlanCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SucessionPlanCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SucessionPlanCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
