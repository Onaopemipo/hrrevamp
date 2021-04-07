import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimeAndAttendanceRoutingModule } from './time-and-attendance-routing.module';
import { TimeAndAttendanceComponent } from './time-and-attendance.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbTabsetModule,
  NbActionsModule,
  NbDatepickerModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbPopoverModule,
  NbDialogModule,
  NbListModule
} from '@nebular/theme';
import { ComponentsModule } from 'app/components/components.module';
import { ThemeModule } from '../../@theme/theme.module';
import { ProjectsComponent } from './projects/projects.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ShiftsComponent } from './shifts/shifts.component';
import { CreateshiftComponent } from './createshift/createshift.component';
import { MyattendanceComponent } from './myattendance/myattendance.component';
import { MyshiftsComponent } from './myshifts/myshifts.component';
import { MyongoingshiftsComponent } from './myongoingshifts/myongoingshifts.component';
import { MyprojectsComponent } from './myprojects/myprojects.component';
import { ProjectsdetailsComponent } from './projectsdetails/projectsdetails.component';
@NgModule({
  declarations: [TimeAndAttendanceComponent, DashboardComponent, ProjectsComponent, AddTaskComponent, ShiftsComponent, CreateshiftComponent, MyattendanceComponent, MyshiftsComponent, MyongoingshiftsComponent, MyprojectsComponent, ProjectsdetailsComponent],
  imports: [
    CommonModule,
    TimeAndAttendanceRoutingModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbIconModule,
    NbInputModule,
    NbTabsetModule,
    NbActionsModule,
    NbDatepickerModule,
    NbRadioModule,
    NbSelectModule,
    NbUserModule,
    NbPopoverModule,
    NbDialogModule,
    ComponentsModule,
    ThemeModule,
    NbListModule
  ]
})
export class TimeAndAttendanceModule { }
