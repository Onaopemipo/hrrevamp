import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemoptionComponent } from './systemoption.component';

describe('SystemoptionComponent', () => {
  let component: SystemoptionComponent;
  let fixture: ComponentFixture<SystemoptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemoptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemoptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
