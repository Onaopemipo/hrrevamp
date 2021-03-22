import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseComponent } from './expense/expense.component';
import { ComponentsModule } from 'app/components/components.module';
import { ThemeModule } from 'app/@theme/theme.module';
import { ExpenseRoutingModule } from './expense.routing.module';
import { ExpenseTypeComponent } from './expense-type/expense-type.component';
import { ExpenseRequestComponent } from './expense-request/expense-request.component';
import { ExpenseManagementComponent } from './expense-management/expense-management.component';
import { ExpenseReportComponent } from './expense-report/expense-report.component';
import { ExpenseRequestService } from './services/expense-request.service';
import { AddUpdateExpenseServiceProxy, FetchExpensesServiceProxy } from 'app/_services/service-proxies';



@NgModule({
  declarations: [
    ExpenseComponent,
    ExpenseManagementComponent,
    ExpenseTypeComponent,
    ExpenseRequestComponent,
    ExpenseReportComponent,
  ],
  providers: [
    AddUpdateExpenseServiceProxy,
    FetchExpensesServiceProxy,
    ExpenseRequestService,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ThemeModule,
    ExpenseRoutingModule,
  ]
})
export class ExpenseModule { }
