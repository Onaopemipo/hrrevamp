import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BenefitComponent } from "./benefit.component";
import { ComponentsModule } from "app/components/components.module";
import { BenefitRoutingModule } from "./benefit.routing.module";
import { MedicalInsuranceComponent } from "./medical-insurance/medical-insurance.component";
import { ThemeModule } from "app/@theme/theme.module";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { EmployeeViewComponent } from "./pages/employee-view/employee-view.component";
import { CreateBenefitComponent } from "./pages/create-benefit/create-benefit.component";
import { BenefitViewComponent } from "./pages/benefit-view/benefit-view.component";
import { BenefitdetaisComponent } from "./benefitdetais/benefitdetais.component";
import { EligibilityListComponent } from "./pages/eligibility-list/eligibility-list.component";
import { ManageEmployeeComponent } from "./pages/manage-employee/manage-employee.component";
import { FetchEmployeeCoverageBenefitServiceProxy } from "../../../app/_services/service-proxies";
import { AddBenefitComponent } from "./add-benefit/add-benefit.component";
import { EligibilityviewComponent } from "./eligibilityview/eligibilityview.component";
import {BenefitTypeComponent} from './pages/benefit-type/benefit-type.component';
import { AllplansComponent} from './pages/allplans/allplans.component'

import { PlandetailsComponent } from "./pages/plandetails/plandetails.component";

import Flow from "@flowjs/flow.js";
import { FlowInjectionToken, NgxFlowModule } from "@flowjs/ngx-flow";
import { VendorPlanComponent } from "./vendor-plan/vendor-plan.component";
import {
  AddUpdateVendorServiceProxy,
  DataServiceProxy,
  DeleteVendorServiceProxy,
  FetchAllBenefitsServiceProxy,
  FetchBenefitEligibilitiesServiceProxy,
  AddUpdateBenefitEligibilityServiceProxy,
  FetchBenefitEligibilityServiceProxy,
  AddUpdateVendorPlanServiceProxy,
  AddUpdateBenefitTypeServiceProxy,
  AddUpdateBenefitServiceProxy,
  CommonServiceProxy,
  GetAllVendorServiceProxy,
  GetAllVendorPlanServiceProxy,
  DeleteBenefitServiceProxy,
  FetchAllEligibilitiesServiceProxy,
  DeleteBenefitEligibilityServiceProxy,
  GetVendorByIdServiceProxy,
  FetchAllEmployeesServiceProxy,
  GetVendorPlanByVendorIdServiceProxy,FetchBenefitEmployeesServiceProxy,
  FetchEmployeeByIdServiceProxy,
  FetchBenefitServiceProxy,
  FetchAllBenefitTypesServiceProxy,
  BenefitFinancialYearsServiceProxy,
  GetVendorPlanByIdServiceProxy,
  AddEmployeeToBenefitServiceProxy ,
  AddEmployeeToBenefitBucketServiceProxy,
  BenefitFinancialYearDetailsServiceProxy
  

} from "../../_services/service-proxies";
import { AlertserviceService } from "app/_services/alertservice.service";
import { NbRadioModule } from "@nebular/theme";

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
    BenefitViewComponent,
    BenefitdetaisComponent,
    BenefitTypeComponent,
    AllplansComponent,
    PlandetailsComponent

  ],
  imports: [
    CommonModule,
    ComponentsModule,
    BenefitRoutingModule,
    ThemeModule,
    NbRadioModule,
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
    DeleteVendorServiceProxy,
    GetVendorPlanByVendorIdServiceProxy,
    AddUpdateBenefitTypeServiceProxy,
    GetAllVendorPlanServiceProxy,
    AddUpdateBenefitServiceProxy,
    AddUpdateBenefitEligibilityServiceProxy,
    FetchAllEligibilitiesServiceProxy,
    DeleteBenefitEligibilityServiceProxy,
    FetchBenefitEligibilityServiceProxy,
    FetchBenefitEligibilitiesServiceProxy,
    FetchAllBenefitsServiceProxy,
    GetAllVendorPlanServiceProxy,
    DeleteBenefitEligibilityServiceProxy,
    DeleteBenefitServiceProxy,FetchBenefitEmployeesServiceProxy,
    FetchEmployeeByIdServiceProxy,
    FetchBenefitServiceProxy,
    FetchAllBenefitTypesServiceProxy,
    GetAllVendorPlanServiceProxy,
    BenefitFinancialYearsServiceProxy ,
    GetVendorPlanByIdServiceProxy,
    AddEmployeeToBenefitServiceProxy ,
    AddEmployeeToBenefitBucketServiceProxy,
    BenefitFinancialYearDetailsServiceProxy

  ],
})
export class BenefitModule {}
