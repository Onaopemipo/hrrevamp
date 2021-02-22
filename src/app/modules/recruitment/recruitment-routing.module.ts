import { JobDetailsComponent } from './job-details/job-details.component';
import { ApplicantsDashboardComponent } from './applicants-dashboard/applicants-dashboard.component';
import { ApplicantssignupComponent } from './applicantssignup/applicantssignup.component';
import { RecruitmentComponent } from '../recruitment/recruitment.component';
import { ComponentsModule } from 'app/components/components.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ApplicantssigninComponent } from './applicantssignin/applicantssignin.component';

export const routes: Routes = [
  {
    path: '',
    component: RecruitmentComponent,
    children: [
      {
        path: 'applicantssignin',
        component: ApplicantssigninComponent,
      },
      {
        path: 'applicantssignup',
        component: ApplicantssignupComponent,
      },
      {
        path: '',
        redirectTo: 'applicantssignin',
        pathMatch: 'full',
      },

      // {
      //   path: 'applicantsdashboard',
      //   component: ApplicantsDashboardComponent
      // },

      {
        path: 'jobdetails',
        component: JobDetailsComponent
      },

      {
        path: '**',
        component: ApplicantssigninComponent,
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
