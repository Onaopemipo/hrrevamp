import { ApplicantsComponent } from './applicants/applicants.component';
import { NewquizComponent } from './newquiz/newquiz.component';
import { NewjobComponent } from './newjob/newjob.component';
import { JobsComponent } from './jobs/jobs.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SettingsComponent } from './settings/settings.component';
import { QuizComponent } from './quiz/quiz.component';
import { ReportsComponent } from './reports/reports.component';
import { DashboardComponent } from './dashboard/dashboard.component';

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
        path: 'newjob',
        component: NewjobComponent
      },

      {
        path: 'newquiz',
        component: NewquizComponent
      },

      {
        path: 'quiz',
        component: QuizComponent
      },

      {
        path: 'applicants',
        component: ApplicantsComponent
      },

      {
        path: 'reports',
        component: ReportsComponent
      },

      { path: '', redirectTo: 'jobs', pathMatch: 'full' },
      { path: '**', redirectTo: 'jobs' },
    ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
