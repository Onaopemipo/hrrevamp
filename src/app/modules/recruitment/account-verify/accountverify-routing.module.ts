import { PasswordResetComponent } from './../password-reset/password-reset.component';

import { EmailOTPVerifyComponent } from './../email-otpverify/email-otpverify.component';
import { AccountVerifyComponent } from './account-verify.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ApplicantsDashboardComponent } from '../applicants-dashboard/applicants-dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: AccountVerifyComponent,
    children: [
      {
        path: '',
        component: EmailOTPVerifyComponent,
      },

      {
        path: 'passwordreset',
        component: PasswordResetComponent
      },

      {
        path: 'applicantdashboard',
        component: ApplicantsDashboardComponent
      },

      {
        path: '**',
        component: EmailOTPVerifyComponent,
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
export class AccountVerifyRoutingModule { }
