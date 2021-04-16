import { CreateEmployeeServiceProxy, DataServiceProxy, FetchAllEmployeesServiceProxy, FetchApprovalProcessServiceProxy, FetchEmployeeByIdServiceProxy, GetPromotionEligibilityListsServiceProxy } from './../../_services/service-proxies';
import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';

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
  NbDialogModule,
  NbAlertModule
} from '@nebular/theme';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { ComponentsModule } from 'app/components/components.module';
import { ThemeModule } from '../../@theme/theme.module';

import Flow from '@flowjs/flow.js';
import { FlowInjectionToken, NgxFlowModule } from '@flowjs/ngx-flow';

import { EmployeemoduleRoutingModule } from './employeemodule-routing.module';
import { HiringchecklistComponent } from './hiringchecklist/hiringchecklist.component';
import { EmployeeonboardingdashboardComponent } from './employeeonboardingdashboard/employeeonboardingdashboard.component';
import { OnboardingemployeesComponent } from './onboardingemployees/onboardingemployees.component';
import { EmployeemoduleComponent } from './employeemodule.component';
import { EmployeepersonalinformationComponent } from './employeepersonalinformation/employeepersonalinformation.component';

import { EmploymentexitmanagementComponent } from './employmentexitmanagement/employmentexitmanagement.component';
import { ManagementexistComponent } from './managementexist/managementexist.component';
import { ExistrequestComponent } from './existrequest/existrequest.component';
import { RetirementComponent } from './retirement/retirement.component';
import { RetirementformComponent } from './retirementform/retirementform.component';
import { ExitwarningComponent } from './exitwarning/exitwarning.component';
import { ComfirmationComponent } from './comfirmation/comfirmation.component';
import { EmployeeviewComponent } from './employeeview/employeeview.component';
import { PromotionComponent } from './promotion/promotion.component';
import { PromotioninfoComponent } from './promotioninfo/promotioninfo.component';
import { PromotioneligibilityComponent } from './promotioneligibility/promotioneligibility.component';
import { EligibilityxxComponent } from './eligibilityxx/eligibilityxx.component';
import { AnothereligibilitylistComponent } from './anothereligibilitylist/anothereligibilitylist.component';
import { EmployeedeploymentmanagementComponent } from './employeedeploymentmanagement/employeedeploymentmanagement.component';
import { DeploymentviewComponent } from './deploymentview/deploymentview.component';
import { ManagementviewComponent } from './managementview/managementview.component';
import { DeploymentapplicationComponent } from './deploymentapplication/deploymentapplication.component';
import { CardComponent } from './card/card.component';
import { EmployeerecordsComponent } from './employeerecords/employeerecords.component';
import { EmployeerecordsviewComponent } from './employeerecordsview/employeerecordsview.component';
import { EmployeerbulkaddComponent } from './employeerbulkadd/employeerbulkadd.component';
import { ExitRequestService } from './services/exit-request.service';
import {
  GetEligibilityListServiceProxy, FileUploadServiceProxy, GetAllProfessionalBodiesServiceProxy,
  RecruitmentSettingServiceProxy, UploadProfileImageServiceProxy, CommonServiceProxy,PostServiceProxy,AddUpdateEligibleBucketServiceProxy,FetchEmployeeOnboardingDataDetailsServiceProxy
} from 'app/_services/service-proxies';
import { AlertserviceService } from 'app/_services/alertservice.service';
// import{ FetchEmployeeOnboardingDataDetailsServiceProxy} from '../../_services/service-proxies'
// import { FormsModule } from '@angular/forms';



@NgModule({
  declarations:
    [
      HiringchecklistComponent,
      EmployeeonboardingdashboardComponent,
      EmploymentexitmanagementComponent,
      ManagementexistComponent,
      ExistrequestComponent,
      RetirementComponent,
      RetirementformComponent,
      ExitwarningComponent,
      ComfirmationComponent,
      EmployeeviewComponent,
      PromotionComponent,
      PromotioninfoComponent,
      OnboardingemployeesComponent,
      EmployeemoduleComponent,
      EmployeepersonalinformationComponent,
      PromotioneligibilityComponent,
      EligibilityxxComponent,
      AnothereligibilitylistComponent,
      EmployeedeploymentmanagementComponent,
      DeploymentviewComponent,
      ManagementviewComponent,
      DeploymentapplicationComponent,
      EmployeerecordsComponent,
      EmployeerecordsviewComponent,
      EmployeerbulkaddComponent,
    
      CardComponent],
  imports: [
    CommonModule,
    EmployeemoduleRoutingModule,
    ThemeModule,
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
    NbAlertModule,

  ],
  providers: [
    {
      provide: FlowInjectionToken,
      useValue: Flow,
    },

    CreateEmployeeServiceProxy,
    FetchAllEmployeesServiceProxy,
    DataServiceProxy,
    ExitRequestService,
    FetchEmployeeByIdServiceProxy,
    GetAllProfessionalBodiesServiceProxy,
    RecruitmentSettingServiceProxy,
    FileUploadServiceProxy,
    UploadProfileImageServiceProxy,
    GetEligibilityListServiceProxy,
    AddUpdateEligibleBucketServiceProxy,
    FetchApprovalProcessServiceProxy,
    GetPromotionEligibilityListsServiceProxy,
    FetchEmployeeOnboardingDataDetailsServiceProxy,
    PostServiceProxy,
    CommonServiceProxy,
    AlertserviceService
  ]
   
    

})
export class EmployeemoduleModule { }
