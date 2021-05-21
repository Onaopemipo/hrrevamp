import { InterestTypeComponent } from './interest-type/interest-type.component';
import { AllLoansComponent } from './all-loans/all-loans.component';
import { UpdateLoanComponent } from './update-loan/update-loan.component';
import { ProcessRequestComponent } from './process-request/process-request.component';
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
        path: '',
        component: AllLoansComponent,
      },

    {
      path: 'request',
      component: LoanRequestComponent,
    },

    {
      path: 'loan-type',
      component: LoanTypeComponent,
    },

    {
      path: 'process-loan/:id',
      component: ProcessRequestComponent,
    },

    {
      path: 'update-loan',
      component: UpdateLoanComponent,
    },

    {
      path: 'interest-type',
      component: InterestTypeComponent,

    },

    { path: '', redirectTo: 'all-loans', pathMatch: 'full' },
    { path: '**', redirectTo: 'all-loans' },
  ]

  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanRoutingModule { }
