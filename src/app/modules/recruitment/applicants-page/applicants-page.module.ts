import { ApplicantProfileComponent } from './../applicant-profile/applicant-profile.component';
import { JobPerferenceServiceProxy, RecruitmentJobServiceProxy, FetchDashboardDataServiceProxy } from './../../../_services/service-proxies';
import { Flow } from '@flowjs/flow.js';
import { FlowInjectionToken } from '@flowjs/ngx-flow';
import { RecruitmentRoutingModule } from './../recruitment-routing.module';
import { ComponentsModule } from 'app/components/components.module';
import { ThemeModule } from 'app/@theme/theme.module';
import { ApplicantquizComponent } from './../applicantquiz/applicantquiz.component';
import { ProfileDetailsComponent } from './../../career-succession/profile-details/profile-details.component';
import { ApplicantsPageComponent } from './applicants-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicantsPageRoutingModule } from './applicants-page-routing.module';
import { NbButtonModule, NbInputModule, NbIconModule, NbCardModule, NbMenuModule, NbRadioModule, NbProgressBarModule, NbCheckboxModule, NbDatepickerModule, NbActionsModule } from '@nebular/theme';
import { RecruitmentJobApplicationServiceProxy, CompleteApplicantProfileServiceProxy, UploadDocumentServiceProxy, GetApplicantByIdServiceProxy, CommonServiceProxy, GetAllDepartmentsServiceProxy } from 'app/_services/service-proxies';
import { JobDetailsComponent } from '../job-details/job-details.component';


@NgModule({
  declarations: [ApplicantsPageComponent, JobDetailsComponent, ApplicantProfileComponent, ApplicantquizComponent, ],
  imports: [
    ThemeModule,
    CommonModule,
    ApplicantsPageRoutingModule,
    NbButtonModule,
    NbInputModule,
    NbIconModule,
    ComponentsModule,
    RecruitmentRoutingModule,
    NbCardModule,
    NbMenuModule,
    NbRadioModule,
    NbProgressBarModule,
    NbCheckboxModule,
    NbDatepickerModule,
    NbActionsModule,
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
    CompleteApplicantProfileServiceProxy,
    RecruitmentJobApplicationServiceProxy,
    JobPerferenceServiceProxy,
    UploadDocumentServiceProxy,
    GetApplicantByIdServiceProxy,
  ]
})
export class ApplicantsPageModule { }
