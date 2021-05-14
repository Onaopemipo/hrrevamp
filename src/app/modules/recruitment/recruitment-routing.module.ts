import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { InterviewerdashboardComponent } from './interviewerdashboard/interviewerdashboard.component';
import { ApplicantProfileComponent } from './applicant-profile/applicant-profile.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { ApplicantsDashboardComponent } from './applicants-dashboard/applicants-dashboard.component';
import { ApplicantssignupComponent } from './applicantssignup/applicantssignup.component';
import { RecruitmentComponent } from '../recruitment/recruitment.component';
import { ComponentsModule } from 'app/components/components.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ApplicantssigninComponent } from './applicantssignin/applicantssignin.component';
import { ApplicantquizComponent } from './applicantquiz/applicantquiz.component';

export const routes: Routes = [
  {
    path: '',
    component: RecruitmentComponent,
    children: [
      // {
      //   path: 'applicantssignin',
      //   component: ApplicantssigninComponent,
      // },
      // {
      //   path: 'applicantssignup',
      //   component: ApplicantssignupComponent,
      // },
      // {
      //   path: '',
      //   redirectTo: 'applicantssignin',
      //   pathMatch: 'full',
      // },

      {
        path: 'applicantprofile',
        component: ApplicantProfileComponent
      },

      {
        path: 'jobdetails',
        component: JobDetailsComponent
      },

      {
        path: 'applicantsdashboard',
        component: ApplicantsDashboardComponent
      },

      // {
      //   path: 'admin',
      //   component: AdminDashboardComponent
      // },

      {
        path: 'applicantquiz',
        component: ApplicantquizComponent
      },


      // {
      //   path: '**',
      //   component: ApplicantssigninComponent,
      // },
    ],
  }




  // { path: '', redirectTo: 'auth', pathMatch: 'full' },
  // { path: '**', redirectTo: 'auth' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecruitmentRoutingModule { }
