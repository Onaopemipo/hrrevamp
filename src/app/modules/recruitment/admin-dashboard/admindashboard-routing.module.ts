import { JobsComponent } from './jobs/jobs.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { SettingsComponent } from './settings/settings.component';
import { QuizComponent } from './quiz/quiz.component';
import { ReportsComponent } from './reports/reports.component';

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
      },

      {
        path: 'settings',
        component: SettingsComponent
      },

      {
        path: 'quiz',
        component: QuizComponent
      },

      {
        path: 'reports',
        component: ReportsComponent
      }
    ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
