import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HiringchecklistComponent } from './hiringchecklist/hiringchecklist.component';
import { EmployeeonboardingdashboardComponent } from './employeeonboardingdashboard/employeeonboardingdashboard.component';
import { OnboardingemployeesComponent } from './onboardingemployees/onboardingemployees.component';
import { EmployeemoduleComponent } from './employeemodule.component';
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
