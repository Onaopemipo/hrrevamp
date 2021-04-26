import { DataServiceProxy } from 'app/_services/service-proxies';
import { FetchAllBudgetsServiceProxy, FetchAllBudgetItemsServiceProxy, AddUpdateBudgetServiceProxy, SingleDisbursementServiceProxy, GetExpenseProjectServiceProxy, GetAllPaymentInstitutionsServiceProxy, FetchExpensesServiceProxy, AddUpdateBudgetItemServiceProxy, FetchBudgetServiceProxy, DeleteBudgetServiceProxy, DeleteBudgetItemServiceProxy, FetchBudgetItemServiceProxy } from './../../_services/service-proxies';
import { UpdateItemComponent } from './budget/update-item/update-item.component';
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
import { NbDatepickerModule, NbRadioComponent, NbRadioModule, NbCheckboxModule } from '@nebular/theme';
import { OverallBudgetComponent } from './overall-budget/overall-budget.component';



@NgModule({
  declarations: [
    DisbursementComponent,
    DisbursementrequestsComponent,
    DisbursementHistoryComponent,
    SetupComponent,
    BudgetListComponent,
    CreateDisbursementComponent,
    OverallBudgetComponent,
    UpdateItemComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    DisbursmentRoutingModule,
    ThemeModule,
    NbDatepickerModule,
    NbRadioModule,
    NbCheckboxModule,
  ],

  providers: [
    FetchAllBudgetsServiceProxy,
    FetchAllBudgetItemsServiceProxy,
    SingleDisbursementServiceProxy,
    GetExpenseProjectServiceProxy,
    GetAllPaymentInstitutionsServiceProxy,
    GetExpenseProjectServiceProxy,
    DataServiceProxy,
    AddUpdateBudgetServiceProxy,
    FetchExpensesServiceProxy,
    AddUpdateBudgetItemServiceProxy,
    FetchBudgetServiceProxy,
    DeleteBudgetServiceProxy,
    DeleteBudgetItemServiceProxy,
    FetchBudgetItemServiceProxy,
  ],

})
export class DisbursementModule { }
