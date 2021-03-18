import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickypayrollComponent } from './quickypayroll.component';

describe('QuickypayrollComponent', () => {
  let component: QuickypayrollComponent;
  let fixture: ComponentFixture<QuickypayrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickypayrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickypayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
