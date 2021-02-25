import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HiringchecklistComponent } from './hiringchecklist/hiringchecklist.component';
import { EmployeeonboardingdashboardComponent } from './employeeonboardingdashboard/employeeonboardingdashboard.component';
import { OnboardingemployeesComponent } from './onboardingemployees/onboardingemployees.component';
import { EmployeemoduleComponent } from './employeemodule.component';
import { EmploymentexitmanagementComponent } from './employmentexitmanagement/employmentexitmanagement.component';
import { ManagementexistComponent } from './managementexist/managementexist.component';
import { ExistrequestComponent } from './existrequest/existrequest.component';
import { EmployeepersonalinformationComponent } from './employeepersonalinformation/employeepersonalinformation.component';
const routes: Routes = [
  {
  path: '',
  component: EmployeemoduleComponent,
  children: 
  [
  {
    path: 'dashboard',
    component: EmployeeonboardingdashboardComponent
  },
  {
    path: 'employeeonboarding',
    component: HiringchecklistComponent
  },
  {
    path: 'allemployees',
    component: OnboardingemployeesComponent
      },
      {
        path: 'exitmanagement',
        component: EmploymentexitmanagementComponent
      },
      {
        path: 'exitform',
        component: ManagementexistComponent
      },
      {
        path: 'exitrequest',
        component: ExistrequestComponent
      },
      {
        path: 'employeeprofile',
        component: EmployeepersonalinformationComponent
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: EmployeeonboardingdashboardComponent,
      },
  ],
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeemoduleRoutingModule { }
