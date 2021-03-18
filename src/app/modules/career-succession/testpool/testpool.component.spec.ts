import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestpoolComponent } from './testpool.component';

describe('TestpoolComponent', () => {
  let component: TestpoolComponent;
  let fixture: ComponentFixture<TestpoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestpoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestpoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
