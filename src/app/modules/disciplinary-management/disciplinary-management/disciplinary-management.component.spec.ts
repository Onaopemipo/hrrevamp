import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplinaryManagementComponent } from './disciplinary-management.component';

describe('DisciplinaryManagementComponent', () => {
  let component: DisciplinaryManagementComponent;
  let fixture: ComponentFixture<DisciplinaryManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisciplinaryManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplinaryManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
