import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TenantonboardingRoutingModule } from './tenantonboarding-routing.module';
import { TenantonboardingComponent } from './tenantonboarding.component';
import { OnboardingsetupComponent } from './onboardingsetup/onboardingsetup.component';
import { Angular4PaystackModule } from 'angular4-paystack';
import { AlertserviceService } from '../../_services/alertservice.service';
import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbTabsetModule,
  NbActionsModule,
  NbDatepickerModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbPopoverModule,
  NbDialogModule
} from '@nebular/theme';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { ComponentsModule } from 'app/components/components.module';
import { ThemeModule } from '../../@theme/theme.module';
import { environment } from 'app/environment';
import { EmployeeofferComponent } from '../employeemodule/employeeoffer/employeeoffer.component';
import { EmployeeonboardingprofileComponent } from './employeeonboardingprofile/employeeonboardingprofile.component';
import { CommonServiceProxy, FetchSubscriptionPlansServiceProxy, RegisterCompanyServiceProxy } from 'app/_services/service-proxies';
import Flow from '@flowjs/flow.js';
import { FlowInjectionToken, NgxFlowModule } from '@flowjs/ngx-flow';

@NgModule({
    declarations: [TenantonboardingComponent, OnboardingsetupComponent, EmployeeofferComponent, EmployeeonboardingprofileComponent],
  imports: [
    CommonModule,
    TenantonboardingRoutingModule,
    ThemeModule,
    CommonModule,
    ngFormsModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbInputModule,
    NbIconModule,
    ComponentsModule,
    NbActionsModule,
    NbDatepickerModule,
    NbRadioModule,
    NbSelectModule,
    NbUserModule,
    NbTabsetModule,
    NbPopoverModule,
    NbDialogModule,
    NgxFlowModule,
    Angular4PaystackModule.forRoot(environment.paystackToken)
  ],
  providers: [
      {
        provide: FlowInjectionToken,
        useValue: Flow,
      },
    , AlertserviceService, FetchSubscriptionPlansServiceProxy, RegisterCompanyServiceProxy,CommonServiceProxy]
})
export class TenantonboardingModule { }
