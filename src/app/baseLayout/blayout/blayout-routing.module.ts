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
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlayoutRoutingModule  {
}
