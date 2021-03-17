import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpayscaleComponent } from './viewpayscale.component';

describe('ViewpayscaleComponent', () => {
  let component: ViewpayscaleComponent;
  let fixture: ComponentFixture<ViewpayscaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewpayscaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewpayscaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
