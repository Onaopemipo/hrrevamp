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
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    BenefitRoutingModule,
    ThemeModule,
  ]
})
export class BenefitModule { }
