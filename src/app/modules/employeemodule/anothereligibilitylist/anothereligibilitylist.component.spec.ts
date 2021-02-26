import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnothereligibilitylistComponent } from './anothereligibilitylist.component';

describe('AnothereligibilitylistComponent', () => {
  let component: AnothereligibilitylistComponent;
  let fixture: ComponentFixture<AnothereligibilitylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnothereligibilitylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnothereligibilitylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
