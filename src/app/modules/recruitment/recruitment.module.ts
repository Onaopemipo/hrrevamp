import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { ComponentsModule } from 'app/components/components.module';

import {
  NbButtonModule,
  NbCardComponent,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbMenuModule,
  NbRadioComponent,
  NbRadioGroupComponent,
  NbProgressBarModule,
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
import { ApplicantProfileComponent } from './applicant-profile/applicant-profile.component';
import { ApplicantSelectionComponent } from './applicant-selection/applicant-selection.component';
import { InterviewerdashboardComponent } from './interviewerdashboard/interviewerdashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ApplicantquizComponent } from './applicantquiz/applicantquiz.component';
import { ApplicantsComponent } from './applicants/applicants.component';




@NgModule({
  declarations: [
    RecruitmentComponent,
    ApplicantsDashboardComponent,
    PasswordResetComponent, NewPasswordComponent,
    ApplicantssigninComponent, ApplicantssignupComponent, JobDetailsComponent, ApplicantProfileComponent,
     ApplicantSelectionComponent, InterviewerdashboardComponent, AdminDashboardComponent, ApplicantquizComponent, ApplicantsComponent],
  imports: [
    ThemeModule,
    CommonModule,
    NbButtonModule,
    ngFormsModule,
    NbCheckboxModule,
    NbInputModule,
    NbIconModule,
    ComponentsModule,
    RecruitmentRoutingModule,
    NbCardModule,
    NbMenuModule,
    NbRadioModule,
    NbProgressBarModule
  ]
})
export class RecruitmentModule { }
