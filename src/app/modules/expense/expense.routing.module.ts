import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ExpenseManagementComponent } from './expense-management/expense-management.component';
import { ExpenseTypeComponent } from './expense-type/expense-type.component';
import { ExpenseRequestComponent } from './expense-request/expense-request.component';
import { ExpenseComponent } from './expense/expense.component';
import { ExpenseReportComponent } from './expense-report/expense-report.component';
import { ExpenseGroupComponent } from './expense-group/expense-group.component';
import { ExpenseProjectActivityComponent } from './expense-project-activity/expense-project-activity.component';
import { ExpenseProjectComponent } from './expense-project/expense-project.component';

export const routes: Routes = [
  {
    path: '',
    component: ExpenseComponent,
    children: [
      {
        path: '',
        component: ExpenseManagementComponent,
      },
      {
        path: 'type',
        component: ExpenseTypeComponent,
      },
      {
        path: 'project',
        component: ExpenseProjectComponent,
      },
      {
        path: 'group',
        component: ExpenseGroupComponent,
      },
      {
        path: 'project/:id/activities',
        component: ExpenseProjectActivityComponent,
      },
      {
        path: 'request',
        component: ExpenseRequestComponent,
      },
      {
        path: 'report',
        component: ExpenseReportComponent,
      },
    ],
  }




  // { path: '', redirectTo: 'auth', pathMatch: 'full' },
  // { path: '**', redirectTo: 'auth' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseRoutingModule { }
