import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitwarningComponent } from './exitwarning.component';

describe('ExitwarningComponent', () => {
  let component: ExitwarningComponent;
  let fixture: ComponentFixture<ExitwarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExitwarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExitwarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
