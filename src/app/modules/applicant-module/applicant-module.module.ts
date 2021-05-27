import { RecruitmentJobApplicationServiceProxy } from './../../_services/service-proxies';
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



import { ApplicantModuleRoutingModule } from './applicant-module-routing.module';
import { ApplicantModuleComponent } from './applicant-module.component';
import { ApplicantsComponent } from './applicants/applicants.component';

@NgModule({
  declarations: [ApplicantModuleComponent, ApplicantsComponent],
  imports: [
    CommonModule,
    ApplicantModuleRoutingModule,
    ThemeModule,
    ComponentsModule,
    NbCheckboxModule

  ],

  providers: [
    RecruitmentJobApplicationServiceProxy
  ],


})
export class ApplicantModuleModule { }
