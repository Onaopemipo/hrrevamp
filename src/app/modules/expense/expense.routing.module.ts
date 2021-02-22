import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ExpenseManagementComponent } from './expense-management/expense-management.component';
import { ExpenseTypeComponent } from './expense-type/expense-type.component';
import { ExpenseRequestComponent } from './expense-request/expense-request.component';
import { ExpenseComponent } from './expense/expense.component';

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
        path: 'request',
        component: ExpenseRequestComponent,
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
