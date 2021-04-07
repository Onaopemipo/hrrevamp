import { EvaluationComponent } from './evaluation/evaluation.component';
import { JobdetailsComponent } from './jobdetails/jobdetails.component';
import { InterviewerdashboardComponent } from './interviewerdashboard.component';
import { ApplicantselectionComponent } from '../interviewerdashboard/applicantselection/applicantselection.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';


export const routes: Routes = [
  {
    path: '',
    component: InterviewerdashboardComponent,
    children: [
      {
        path: 'applicantselection',
        component: ApplicantselectionComponent
      },

      {
        path: 'jobdetails',
        component: JobdetailsComponent
      },

      {
        path: 'evaluation',
        component: EvaluationComponent
      },

      {
        path: '**',
        component: DashboardComponent,
      },
    ],
  }




  // { path: '', redirectTo: 'auth', pathMatch: 'full' },
  // { path: '**', redirectTo: 'auth' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterviewerdashboardRoutingModule { }
