import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BenefitComponent } from './benefit.component';
import { ComponentsModule } from 'app/components/components.module';
import { BenefitRoutingModule } from './benefit.routing.module';
import { MedicalInsuranceComponent } from './medical-insurance/medical-insurance.component';
import { ThemeModule } from 'app/@theme/theme.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';



@NgModule({
  declarations: [
    BenefitComponent,
    MedicalInsuranceComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    BenefitRoutingModule,
    ThemeModule,
  ]
})
export class BenefitModule { }
