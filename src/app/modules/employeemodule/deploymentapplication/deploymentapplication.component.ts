import { Component, OnInit } from '@angular/core';
import { EmployeeDeploymentServiceProxy, CreateDeploymentViewModel } from '../../../_services/service-proxies';

@Component({
  selector: 'ngx-deploymentapplication',
  templateUrl: './deploymentapplication.component.html',
  styleUrls: ['./deploymentapplication.component.scss']
})
export class DeploymentapplicationComponent implements OnInit {

  constructor(private EmployeeDeploymentServiceProxy: EmployeeDeploymentServiceProxy) { }

  ngOnInit(): void {
  }

}
