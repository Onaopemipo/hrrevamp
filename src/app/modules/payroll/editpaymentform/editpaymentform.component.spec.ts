import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpaymentformComponent } from './editpaymentform.component';

describe('EditpaymentformComponent', () => {
  let component: EditpaymentformComponent;
  let fixture: ComponentFixture<EditpaymentformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditpaymentformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpaymentformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
