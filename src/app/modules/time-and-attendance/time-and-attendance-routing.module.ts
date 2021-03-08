import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimeAndAttendanceComponent } from './time-and-attendance.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectsComponent } from './projects/projects.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ShiftsComponent } from './shifts/shifts.component';
import { CreateshiftComponent } from './createshift/createshift.component';
import { MyattendanceComponent } from './myattendance/myattendance.component';
import { MyshiftsComponent } from './myshifts/myshifts.component';
import { MyongoingshiftsComponent } from './myongoingshifts/myongoingshifts.component';
import { MyprojectsComponent } from './myprojects/myprojects.component';
import { ProjectsdetailsComponent } from './projectsdetails/projectsdetails.component';
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
        path: 'timeandattendance/projects',
        component: ProjectsComponent
      },
      {
        path: 'timeandattendance/addtask',
        component: AddTaskComponent
      },
      {
        path: 'timeandattendance/shifts',
        component: ShiftsComponent
      },
      {
        path: 'timeandattendance/createshifts',
        component: CreateshiftComponent
      },
      {
        path: 'timeandattendance/myattendance',
        component: MyattendanceComponent
      },
      {
        path: 'timeandattendance/myshifts',
        component: MyshiftsComponent
      },
      {
        path: 'timeandattendance/myongoingshifts',
        component: MyongoingshiftsComponent
      },
      {
        path: 'timeandattendance/myprojects',
        component: MyprojectsComponent
      },
      {
        path: 'timeandattendance/project-details',
        component: ProjectsdetailsComponent
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
