import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeploymentapplicationComponent } from './deploymentapplication.component';

describe('DeploymentapplicationComponent', () => {
  let component: DeploymentapplicationComponent;
  let fixture: ComponentFixture<DeploymentapplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeploymentapplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeploymentapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
