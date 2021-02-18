import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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

import { EmployeemoduleRoutingModule } from './employeemodule-routing.module';
import { HiringchecklistComponent } from './hiringchecklist/hiringchecklist.component';
import { EmployeeonboardingdashboardComponent } from './employeeonboardingdashboard/employeeonboardingdashboard.component';


@NgModule({
  declarations: [HiringchecklistComponent, EmployeeonboardingdashboardComponent],
  imports: [
    CommonModule,
    EmployeemoduleRoutingModule,
    ThemeModule,
    CommonModule,
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
export class EmployeemoduleModule { }
