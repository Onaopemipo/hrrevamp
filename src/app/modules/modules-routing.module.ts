import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModulesComponent } from './modules.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  component: ModulesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'complaints',
      loadChildren: () => import('../modules/requests-and-complaints/requests-and-complaints.module')
        .then(m => m.RequestsAndComplaintsModule),
    },
    {
      path: 'training',
      loadChildren: () => import('../modules/training/training.module')
      .then(m => m.TrainingModule)
    },
    {
      path: 'self-service',
      loadChildren: () => import('../modules/self-service/self-service.module')
      .then( m => m.SelfServiceModule )
    },
    {
      path: 'communications',
      loadChildren: () => import('../modules/communication/communication.module')
        .then(m => m.CommunicationModule)
    },
    {
      path: 'disbursement',
      loadChildren: () => import('../modules/disbursement/disbursement.module')
        .then(m => m.DisbursementModule)
    },
    {
      path: 'leave',
      loadChildren: () => import('../modules/leave/leave.module')
        .then(m => m.LeaveModule)
    },
    {
      path: 'employeemodule',
      loadChildren: () => import('../modules/employeemodule/employeemodule.module')
        .then(m => m.EmployeemoduleModule)

    },

    // {
    //   path: 'recruitment',
    //   loadChildren: () => import('../modules/recruitment/recruitment.module')
    //   .then(m => m.RecruitmentModule)
    // },

    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: 'dashboard' },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
