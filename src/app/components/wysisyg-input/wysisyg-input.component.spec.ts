import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WysisygInputComponent } from './wysisyg-input.component';

describe('WysisygInputComponent', () => {
  let component: WysisygInputComponent;
  let fixture: ComponentFixture<WysisygInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WysisygInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WysisygInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
