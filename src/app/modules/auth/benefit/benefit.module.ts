import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BenefitComponent } from './benefit.component';
import { ComponentsModule } from 'app/components/components.module';
import { BenefitRoutingModule } from './benefit.routing.module';
import { MedicalInsuranceComponent } from './medical-insurance/medical-insurance.component';
import { ThemeModule } from 'app/@theme/theme.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeViewComponent } from './pages/employee-view/employee-view.component';
import { CreateBenefitComponent } from './pages/create-benefit/create-benefit.component';
import { BenefitViewComponent } from './pages/benefit-view/benefit-view.component';
import { EligibilityListComponent } from './pages/eligibility-list/eligibility-list.component';
import { ManageEmployeeComponent } from './pages/manage-employee/manage-employee.component';
import{ NbRadioModule} from '@nebular/theme'
import { AddBenefitComponent } from './add-benefit/add-benefit.component';
import { EligibilityviewComponent} from './eligibilityview/eligibilityview.component';

import Flow from '@flowjs/flow.js';
import { FlowInjectionToken, NgxFlowModule } from '@flowjs/ngx-flow';
import { VendorPlanComponent } from './vendor-plan/vendor-plan.component';
import {
  AddUpdateVendorServiceProxy, DataServiceProxy, DeleteVendorServiceProxy,FetchBenefitEligibilitiesServiceProxy, DeleteBenefitEligibilityServiceProxy,AddUpdateBenefitEligibilityServiceProxy,FetchBenefitEligibilityServiceProxy, AddUpdateVendorPlanServiceProxy,AddUpdateBenefitTypeServiceProxy,AddUpdateBenefitServiceProxy,
  CommonServiceProxy, GetAllVendorServiceProxy,GetAllVendorPlanServiceProxy ,FetchAllEligibilitiesServiceProxy , GetVendorByIdServiceProxy,FetchAllEmployeesServiceProxy,GetVendorPlanByVendorIdServiceProxy
  ,FetchEmployeeCoverageBenefitServiceProxy} from '../../../_services/service-proxies';
import { AlertserviceService } from 'app/_services/alertservice.service';



@NgModule({
  declarations: [
    BenefitComponent,
    MedicalInsuranceComponent,
    DashboardComponent,
    EmployeeViewComponent,
    CreateBenefitComponent,
    BenefitViewComponent,
    EligibilityListComponent,
    ManageEmployeeComponent,
    VendorPlanComponent,
    AddBenefitComponent,
    EligibilityviewComponent,

  ],
  imports: [
    CommonModule,
    ComponentsModule,
    BenefitRoutingModule,
    ThemeModule,
    NbRadioModule
  ],
  providers: [
    {
      provide: FlowInjectionToken,
      useValue: Flow,
    },
    FetchEmployeeCoverageBenefitServiceProxy,
    AddUpdateVendorServiceProxy,
    DataServiceProxy,
    AlertserviceService,
    AddUpdateVendorPlanServiceProxy,
    CommonServiceProxy,
    GetVendorByIdServiceProxy,
    GetAllVendorServiceProxy,
    FetchAllEmployeesServiceProxy,
    DeleteVendorServiceProxy,GetVendorPlanByVendorIdServiceProxy,
    AddUpdateBenefitTypeServiceProxy,
    GetAllVendorPlanServiceProxy ,
    AddUpdateBenefitServiceProxy,
    AddUpdateBenefitEligibilityServiceProxy,
    FetchAllEligibilitiesServiceProxy,
    DeleteBenefitEligibilityServiceProxy ,
    FetchBenefitEligibilityServiceProxy,
    FetchBenefitEligibilitiesServiceProxy,
    DeleteBenefitEligibilityServiceProxy

  ]
})
export class BenefitModule { }
