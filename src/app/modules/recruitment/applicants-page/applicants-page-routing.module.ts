import { ApplicantssigninComponent } from './../applicantssignin/applicantssignin.component';
import { ApplicantProfileComponent } from './../applicant-profile/applicant-profile.component';
import { ApplicantsDashboardComponent } from './../applicants-dashboard/applicants-dashboard.component';
import { JobDetailsComponent } from './../job-details/job-details.component';
import { ApplicantsPageComponent } from './applicants-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: ApplicantsPageComponent,
    children: [

      {
        path: 'profile/:id',
        component: ApplicantProfileComponent
      },

      {
        path: 'jobdetails/:id',
        component: JobDetailsComponent
      },

      {
        path: 'applicantsdashboard',
        component: ApplicantsDashboardComponent
      },

    {
      path: 'login',
      component: ApplicantssigninComponent
    },

      {
        path: '**',
        component: ApplicantsPageComponent,
      },
    ],
  },




  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicantsPageRoutingModule { }
