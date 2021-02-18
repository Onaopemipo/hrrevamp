import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HiringchecklistComponent } from './hiringchecklist/hiringchecklist.component';
import { EmployeeonboardingdashboardComponent } from './employeeonboardingdashboard/employeeonboardingdashboard.component';
const routes: Routes = [
  {
    path: '',
    component: EmployeeonboardingdashboardComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeemoduleRoutingModule { }
