import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetupComponent } from './budget/setup/setup.component';
import { DisbursementComponent } from './disbursement.component';
// import { SelfServiceComponent } from './self-service.component';
const routes: Routes = [
  {
    path: '',
    component: DisbursementComponent,
    children: [
      {
        path: 'budget-setup',
        component: SetupComponent,
      },
    //   {
    //     path: 'employeeevents',
    //     component: EmployeeeventsComponent
    //   },
    //   { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisbursmentRoutingModule {}
