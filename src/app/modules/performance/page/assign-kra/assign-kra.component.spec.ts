import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignKraComponent } from './assign-kra.component';

describe('AssignKraComponent', () => {
  let component: AssignKraComponent;
  let fixture: ComponentFixture<AssignKraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignKraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignKraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
