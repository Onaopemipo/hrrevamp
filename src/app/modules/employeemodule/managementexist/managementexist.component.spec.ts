import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementexistComponent } from './managementexist.component';

describe('ManagementexistComponent', () => {
  let component: ManagementexistComponent;
  let fixture: ComponentFixture<ManagementexistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementexistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementexistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
