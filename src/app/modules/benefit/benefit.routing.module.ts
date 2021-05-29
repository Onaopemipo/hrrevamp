import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BenefitComponent } from './benefit.component';
import { MedicalInsuranceComponent } from './medical-insurance/medical-insurance.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeViewComponent } from './pages/employee-view/employee-view.component';
import { CreateBenefitComponent } from './pages/create-benefit/create-benefit.component';
import { BenefitViewComponent } from './pages/benefit-view/benefit-view.component';
import { EligibilityListComponent } from './pages/eligibility-list/eligibility-list.component';
import { ManageEmployeeComponent } from './pages/manage-employee/manage-employee.component';
import { VendorPlanComponent } from './vendor-plan/vendor-plan.component';
import {  AddBenefitComponent } from './add-benefit/add-benefit.component';
import { EligibilityviewComponent} from './eligibilityview/eligibilityview.component';
import{ BenefitdetaisComponent} from './benefitdetais/benefitdetais.component';
import {BenefitTypeComponent} from './pages/benefit-type/benefit-type.component';
import { AllplansComponent} from './pages/allplans/allplans.component';
import { PlandetailsComponent } from "./pages/plandetails/plandetails.component";

export const routes: Routes = [
  {
    path: '',
    component: BenefitComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'employee/:id',
        component: EmployeeViewComponent,
      },
      {
        path: 'addBenefit',
        component: AddBenefitComponent,
      },
      {
        path: 'create-benefit/:id',
        component: CreateBenefitComponent,
      },
      {
        path: 'medical-insurance',
        component: MedicalInsuranceComponent,
      },
      {
        path: 'benefits',
        component: BenefitViewComponent,
      },
      {
        path: 'manage-employee',
        component: ManageEmployeeComponent,
      },
      {
        path: 'eligibility',
        component: EligibilityListComponent,
      },
      {
        path: 'BenefitsVendor',
        component: VendorPlanComponent,
      },
      {
        path: 'eligibilityView/:id',
        component: EligibilityviewComponent,
      },
      {
        path: 'BenefitDetails/:id',
        component: BenefitdetaisComponent,
      },

      {
        path: 'BenefitType',
        component: BenefitTypeComponent,
      },
      {
        path: 'allPlans',
        component: AllplansComponent,
      },
      
      {
        path: 'plandetails/:id',
        component: PlandetailsComponent,
      },
  
  
  
  
    ],
  }




  // { path: '', redirectTo: 'auth', pathMatch: 'full' },
  // { path: '**', redirectTo: 'auth' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BenefitRoutingModule { }
