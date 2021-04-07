import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NineGridBoxEmployeeComponent } from './nine-grid-box-employee.component';

describe('NineGridBoxEmployeeComponent', () => {
  let component: NineGridBoxEmployeeComponent;
  let fixture: ComponentFixture<NineGridBoxEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NineGridBoxEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NineGridBoxEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
