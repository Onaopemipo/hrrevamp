import { ApplicantssigninComponent } from './../recruitment/applicantssignin/applicantssignin.component';
import { ApplicantssignupComponent } from './../recruitment/applicantssignup/applicantssignup.component';
import { ApplicantsComponent } from './applicants/applicants.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicantModuleComponent } from './applicant-module.component';
const routes: Routes = [
  {
    path: '',
    component: ApplicantModuleComponent,
    children: [
      {
        path: 'applicants',
        component: ApplicantsComponent
      },

      {
        path: 'signup',
        component: ApplicantssignupComponent
      },

      {
        path: 'signin',
        component: ApplicantssigninComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicantModuleRoutingModule { }
