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
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { ApplicantsDashboardComponent } from './applicants-dashboard/applicants-dashboard.component';
import { RecruitmentComponent } from './recruitment.component';
import { RecruitmentRoutingModule } from './recruitment-routing.module';
import { NewPasswordComponent } from './passwordReset/new-password/new-password.component';
import { ApplicantssigninComponent } from './applicantssignin/applicantssignin.component';
import { ApplicantssignupComponent } from './applicantssignup/applicantssignup.component';
import { JobDetailsComponent } from './job-details/job-details.component';




@NgModule({
  declarations: [RecruitmentComponent, ApplicantsDashboardComponent, PasswordResetComponent, NewPasswordComponent,
    ApplicantssigninComponent, ApplicantssignupComponent, JobDetailsComponent],
  imports: [
    ThemeModule,
    CommonModule,
    NbButtonModule,
    NbCardModule,
    ngFormsModule,
    NbCheckboxModule,
    NbInputModule,
    NbIconModule,
    ComponentsModule,
    RecruitmentRoutingModule,
  ]
})
export class RecruitmentModule { }
