import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HiringchecklistComponent } from './hiringchecklist/hiringchecklist.component';
import { EmployeeonboardingdashboardComponent } from './employeeonboardingdashboard/employeeonboardingdashboard.component';
import { EmploymentexitmanagementComponent } from './employmentexitmanagement/employmentexitmanagement.component';
import { ManagementexistComponent } from './managementexist/managementexist.component';
import { ExistrequestComponent } from './existrequest/existrequest.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeonboardingdashboardComponent
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
path : 'exitrequest',
component : ExistrequestComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeemoduleRoutingModule { }
