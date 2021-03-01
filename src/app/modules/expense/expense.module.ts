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



@NgModule({
  declarations: [
    ExpenseComponent,
    ExpenseManagementComponent,
    ExpenseTypeComponent,
    ExpenseRequestComponent,
    ExpenseReportComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ThemeModule,
    ExpenseRoutingModule,
  ]
})
export class ExpenseModule { }
