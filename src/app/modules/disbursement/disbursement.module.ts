import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisbursementComponent } from './disbursement.component';
import { ComponentsModule } from 'app/components/components.module';
import { DisbursmentRoutingModule } from './disbursement.routing.module';
import { SetupComponent } from './budget/setup/setup.component';
import { BudgetListComponent } from './budget/budget-list/budget-list.component';
import { CreateDisbursementComponent } from './disbursement/create-disbursement/create-disbursement.component';
import { DisbursementrequestsComponent } from './disbursement/disbursementrequests/disbursementrequests.component';
import { DisbursementHistoryComponent } from './disbursement/disbursement-history/disbursement-history.component';
import { ThemeModule } from 'app/@theme/theme.module';
import { NbDatepickerModule } from '@nebular/theme';



@NgModule({
  declarations: [
    DisbursementComponent,
    DisbursementrequestsComponent,
    DisbursementHistoryComponent,
    SetupComponent,
    BudgetListComponent,
    CreateDisbursementComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    DisbursmentRoutingModule,
    ThemeModule,
    NbDatepickerModule,
  ]
})
export class DisbursementModule { }
