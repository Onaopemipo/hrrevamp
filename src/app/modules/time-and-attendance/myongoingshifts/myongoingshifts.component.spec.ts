import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyongoingshiftsComponent } from './myongoingshifts.component';

describe('MyongoingshiftsComponent', () => {
  let component: MyongoingshiftsComponent;
  let fixture: ComponentFixture<MyongoingshiftsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyongoingshiftsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyongoingshiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
