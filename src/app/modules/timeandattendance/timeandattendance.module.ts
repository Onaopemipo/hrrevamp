import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';

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
import { FormsModule as ngFormsModule } from '@angular/forms';
import { ComponentsModule } from 'app/components/components.module';
import { ThemeModule } from '../../@theme/theme.module';

import { TimeandattendanceRoutingModule } from './timeandattendance-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TimeandattendanceComponent } from './timeandattendance.component';

@NgModule({
  declarations: [DashboardComponent, TimeandattendanceComponent],
  imports: [
    CommonModule,
    TimeandattendanceRoutingModule,
    ThemeModule,
    ngFormsModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbInputModule,
    NbIconModule,
    ComponentsModule,
    NbActionsModule,
    NbDatepickerModule,
    NbRadioModule,
    NbSelectModule,
    NbUserModule,
    NbTabsetModule,
    NbPopoverModule,
    NbDialogModule,

  ]
})
export class TimeandattendanceModule { }
