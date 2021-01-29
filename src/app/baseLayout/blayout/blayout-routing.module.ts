import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { BlayoutComponent } from './blayout.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  component: BlayoutComponent,
  children: [
    {
      path: 'dashboard',
      component:DashboardComponent
    },
    { 
      path: 'complaints',
      loadChildren: () => import('../../modules/requests-and-complaints/requests-and-complaints.module').then( m => m.RequestsAndComplaintsModule )
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlayoutRoutingModule  {
}
