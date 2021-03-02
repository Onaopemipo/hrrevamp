import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeploymentviewComponent } from './deploymentview.component';

describe('DeploymentviewComponent', () => {
  let component: DeploymentviewComponent;
  let fixture: ComponentFixture<DeploymentviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeploymentviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeploymentviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
