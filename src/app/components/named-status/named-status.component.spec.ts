import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NamedStatusComponent } from './named-status.component';

describe('NamedStatusComponent', () => {
  let component: NamedStatusComponent;
  let fixture: ComponentFixture<NamedStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NamedStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NamedStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
