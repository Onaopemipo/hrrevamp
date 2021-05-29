import { DashboardComponent } from './../recruitment/admin-dashboard/dashboard/dashboard.component';
import { EmailOTPVerifyComponent } from './email-otpverify/email-otpverify.component';
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

      {
        path: '',
        component: DashboardComponent,
      },

      {
        path: 'signin',
        component: ApplicantssigninComponent,
      },
      {
        path: 'signup',
        component: ApplicantssignupComponent,
      },

      {
        path: 'profile',
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

      // {
      //   path: 'applicantselection',
      //   component: ApplicantSelectionComponent
      // },

      // {
      //   path: 'verify/:id',
      //   component: AdminDashboardComponent
      // },

      {
        path: 'applicantquiz',
        component: EmailOTPVerifyComponent
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
export class RecruitmentRoutingModule { }
