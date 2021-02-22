import { JobsComponent } from './jobs/jobs.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },

      {
        path: 'jobs',
        component: JobsComponent
      }
    ]
    }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
