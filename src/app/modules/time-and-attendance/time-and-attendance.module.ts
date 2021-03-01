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
  NbDialogModule
} from '@nebular/theme';
import { ComponentsModule } from 'app/components/components.module';
import { ThemeModule } from '../../@theme/theme.module';
@NgModule({
  declarations: [TimeAndAttendanceComponent, DashboardComponent],
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
    ThemeModule
  ]
})
export class TimeAndAttendanceModule { }
