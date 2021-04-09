import { LoanComponent } from './loan.component';
import { LoanTypeComponent } from './loan-type/loan-type.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoanRequestComponent } from './loan-request/loan-request.component';

const routes: Routes = [
  {
    path: '',
    component: LoanComponent,
    children: [
    {
      path: 'request',
      component: LoanRequestComponent,
    },

    {
      path: 'loan-type',
      component: LoanTypeComponent,
    },

    { path: '', redirectTo: 'request', pathMatch: 'full' },
    { path: '**', redirectTo: 'request' },
  ]

  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanRoutingModule { }
