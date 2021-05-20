import { GetExpenseProjectServiceProxy, AddUpdateLoanTypeServiceProxy, GetExpenseTypesServiceProxy, AddUpdateExpenseGroupServiceProxy, GetExpenseGroupsServiceProxy, GetProjectActivityServiceProxy, AddUpdateProjectActivityServiceProxy, AddExpenseSubTypeServiceProxy, GetExpenseSubTypesServiceProxy } from './../../_services/service-proxies';
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
import { AddUpdateExpenseServiceProxy, AddUpdateExpenseProjectServiceProxy, FetchExpensesServiceProxy } from 'app/_services/service-proxies';
import { ExpenseGroupComponent } from './expense-group/expense-group.component';
import { ExpenseGroupService, ExpenseProjectActivityService, ExpenseProjectService, ExpenseSubTypeService, ExpenseTypeService } from './services/expense-group.service';
import { ExpenseProjectActivityComponent } from './expense-project-activity/expense-project-activity.component';
import { ExpenseProjectComponent } from './expense-project/expense-project.component';
import { ExpenseSubTypeComponent } from './expense-sub-type/expense-sub-type.component';



@NgModule({
  declarations: [
    ExpenseComponent,
    ExpenseManagementComponent,
    ExpenseTypeComponent,
    ExpenseRequestComponent,
    ExpenseReportComponent,
    ExpenseGroupComponent,
    ExpenseProjectActivityComponent,
    ExpenseProjectComponent,
    ExpenseSubTypeComponent,
  ],
  providers: [
    AddUpdateExpenseProjectServiceProxy,
    AddUpdateExpenseServiceProxy,
    ExpenseRequestService,
    FetchExpensesServiceProxy,
    AddUpdateLoanTypeServiceProxy,
    GetExpenseTypesServiceProxy,
    GetExpenseProjectServiceProxy,
    GetExpenseProjectServiceProxy,
    AddUpdateExpenseGroupServiceProxy,
    GetExpenseGroupsServiceProxy,
    GetProjectActivityServiceProxy,
    AddUpdateProjectActivityServiceProxy,
    ExpenseRequestService,
    ExpenseGroupService,
    ExpenseProjectActivityService,
    ExpenseProjectService,
    ExpenseTypeService,
    ExpenseSubTypeService,
    AddExpenseSubTypeServiceProxy,
    GetExpenseSubTypesServiceProxy,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ThemeModule,
    ExpenseRoutingModule,
  ],
})
export class ExpenseModule { }
