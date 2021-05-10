import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAppraisalsComponent } from './my-appraisals.component';

describe('MyAppraisalsComponent', () => {
  let component: MyAppraisalsComponent;
  let fixture: ComponentFixture<MyAppraisalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAppraisalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAppraisalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
