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

import { PayrollRoutingModule } from './payroll-routing.module';
import { PayrollComponent } from './payroll.component';
import { PayrollcomponentComponent } from './payrollcomponent/payrollcomponent.component';
import { PaymentcreateComponent } from './paymentcreate/paymentcreate.component';
import { InstitutionalmanagementComponent } from './institutionalmanagement/institutionalmanagement.component';


@NgModule({
  declarations: [PayrollComponent, PayrollcomponentComponent, PaymentcreateComponent, InstitutionalmanagementComponent],
  imports: [
    ComponentsModule,
    CommonModule,
    PayrollRoutingModule,
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
    ngFormsModule,
    ComponentsModule,
    ThemeModule,
  ]
})
export class PayrollModule { }
