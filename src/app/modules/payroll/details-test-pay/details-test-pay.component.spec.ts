import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTestPayComponent } from './details-test-pay.component';

describe('DetailsTestPayComponent', () => {
  let component: DetailsTestPayComponent;
  let fixture: ComponentFixture<DetailsTestPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsTestPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTestPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
