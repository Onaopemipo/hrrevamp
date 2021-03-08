import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionalmanagementComponent } from './institutionalmanagement.component';

describe('InstitutionalmanagementComponent', () => {
  let component: InstitutionalmanagementComponent;
  let fixture: ComponentFixture<InstitutionalmanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionalmanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionalmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
