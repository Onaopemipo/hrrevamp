import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateleaveRequestComponent } from './createleave-request.component';

describe('CreateleaveRequestComponent', () => {
  let component: CreateleaveRequestComponent;
  let fixture: ComponentFixture<CreateleaveRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateleaveRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateleaveRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
