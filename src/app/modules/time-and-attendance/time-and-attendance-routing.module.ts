import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimeAndAttendanceComponent } from './time-and-attendance.component';
import { DashboardComponent } from './dashboard/dashboard.component';
const routes: Routes = [
  {
    path: '',
    component: TimeAndAttendanceComponent,
    children: [
      {
        path: 'timeandattendance/dashboard',
        component: DashboardComponent
      },
      {
        path: '',
        redirectTo: 'timeandattendance/dashboard',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: DashboardComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeAndAttendanceRoutingModule { }
