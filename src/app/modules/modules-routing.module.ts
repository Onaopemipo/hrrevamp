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
      loadChildren: () => import('../modules/training/training.module').then(m => m.TrainingModule)
    },
    {
      path: 'self-service',
      loadChildren: () => import('../modules/self-service/self-service.module').then( m => m.SelfServiceModule )
    },
    {
      path: 'communications',
      loadChildren: () => import('../modules/communication/communication.module')
        .then(m => m.CommunicationModule)
    },

    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }