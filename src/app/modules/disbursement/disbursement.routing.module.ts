import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BudgetListComponent } from './budget/budget-list/budget-list.component';
import { SetupComponent } from './budget/setup/setup.component';
import { DisbursementComponent } from './disbursement.component';
import { CreateDisbursementComponent } from './disbursement/create-disbursement/create-disbursement.component';
import { DisbursementHistoryComponent } from './disbursement/disbursement-history/disbursement-history.component';
import { DisbursementrequestsComponent } from './disbursement/disbursementrequests/disbursementrequests.component';
import { OverallBudgetComponent } from './overall-budget/overall-budget.component';
// import { SelfServiceComponent } from './self-service.component';
const routes: Routes = [
  {
    path: '',
    component: DisbursementComponent,
    children: [
      {
        path: '',
        component: OverallBudgetComponent,
      },
      {
        path: 'budget',
        component: BudgetListComponent,
      },
      {
        path: 'budget/setup',
        component: SetupComponent,
      },
      {
        path: 'disbursement/create',
        component: CreateDisbursementComponent,
      },
      {
        path: 'disbursement/requests',
        component: DisbursementrequestsComponent,
      },
      {
        path: 'disbursement/history',
        component: DisbursementHistoryComponent,
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisbursmentRoutingModule {}
