import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyattendanceComponent } from './myattendance.component';

describe('MyattendanceComponent', () => {
  let component: MyattendanceComponent;
  let fixture: ComponentFixture<MyattendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyattendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyattendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
