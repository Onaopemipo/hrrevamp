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
        path: 'employee',
        component: EmployeeViewComponent,
      },
      {
        path: 'create-benefit',
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
