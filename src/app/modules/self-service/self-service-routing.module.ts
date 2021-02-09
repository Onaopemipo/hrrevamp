import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeeventsComponent } from './employeeevents/employeeevents.component';
import { SelfServiceComponent } from './self-service.component';
const routes: Routes = [
  {
    path: '',
    component: SelfServiceComponent,
    children: [
      {
        path: 'dashboard',
    component: DashboardComponent,
      },
      {
        path: 'employeeevents',
        component: EmployeeeventsComponent
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelfServiceRoutingModule {}
