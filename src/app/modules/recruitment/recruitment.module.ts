import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { ComponentsModule } from 'app/components/components.module';

import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
} from '@nebular/theme';
import { RecruitmentComponent } from './recruitment.component';
import { ApplicantssigninComponent } from './applicantssignin/applicantssignin.component';
import { NewPasswordComponent } from './passwordReset/new-password/new-password.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { ApplicantssignupComponent } from './applicantssignup/applicantssignup.component';
import { RecruitmentRoutingModule } from './recruitment-routing.module';
// import { FormsModule as ngFormsModule } from '@angular/forms';
// import { RecruitmentComponent } from './recruitment.component';
// import { AccountVerifyComponent } from './account-verify/account-verify.component';
// import { PasswordResetComponent } from './password-reset/password-reset.component';
// import { NewPasswordComponent } from './passwordReset/new-password/new-password.component';
// import { ApplicantsDashboardComponent } from './applicants-dashboard/applicants-dashboard.component';




@NgModule({
  declarations: [RecruitmentComponent, ApplicantssigninComponent, ApplicantssignupComponent,
    PasswordResetComponent, NewPasswordComponent, ApplicantssignupComponent],
  imports: [
    ThemeModule,
    CommonModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbInputModule,
    NbIconModule,
    ComponentsModule,
    RecruitmentRoutingModule
  ]
})
export class RecruitmentModule { }
