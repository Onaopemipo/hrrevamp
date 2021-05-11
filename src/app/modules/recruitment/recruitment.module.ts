import { CommonServiceProxy, GetAllDepartmentsServiceProxy } from 'app/_services/service-proxies';
import { RecruitmentJobServiceProxy } from './../../_services/service-proxies';
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
import {FetchDashboardDataServiceProxy } from '../../_services/service-proxies';
import Flow from '@flowjs/flow.js';
import { FlowInjectionToken, NgxFlowModule } from '@flowjs/ngx-flow';


@NgModule({
  declarations: [
    RecruitmentComponent,
    PasswordResetComponent, NewPasswordComponent,
    ApplicantssigninComponent, ApplicantssignupComponent, JobDetailsComponent, ApplicantProfileComponent,
     ApplicantSelectionComponent, InterviewerdashboardComponent, AdminDashboardComponent, ApplicantquizComponent],
  imports: [
    ThemeModule,
    CommonModule,
    NbButtonModule,
    ngFormsModule,
    NbInputModule,
    NbIconModule,
    ComponentsModule,
    RecruitmentRoutingModule,
    NbCardModule,
    NbMenuModule,
    NbRadioModule,
    NbProgressBarModule,
    NbCheckboxModule
  ],
  providers: [
    {
      provide: FlowInjectionToken,
      useValue: Flow,
    },

    FetchDashboardDataServiceProxy,
    RecruitmentJobServiceProxy,
    CommonServiceProxy,
    GetAllDepartmentsServiceProxy,
  ]

})
export class RecruitmentModule { }
