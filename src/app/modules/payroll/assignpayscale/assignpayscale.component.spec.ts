import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignpayscaleComponent } from './assignpayscale.component';

describe('AssignpayscaleComponent', () => {
  let component: AssignpayscaleComponent;
  let fixture: ComponentFixture<AssignpayscaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignpayscaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignpayscaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
