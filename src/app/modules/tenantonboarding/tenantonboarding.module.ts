import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TenantonboardingRoutingModule } from './tenantonboarding-routing.module';
import { TenantonboardingComponent } from './tenantonboarding.component';
import { OnboardingsetupComponent } from './onboardingsetup/onboardingsetup.component';
import { Angular4PaystackModule } from 'angular4-paystack';
import { alertmodalComponent } from '../../_services/alertservice.service';
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

@NgModule({
  declarations: [TenantonboardingComponent, OnboardingsetupComponent,alertmodalComponent],
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
    Angular4PaystackModule.forRoot(environment.paystackToken)
  ],
  providers:[AlertserviceService]
})
export class TenantonboardingModule { }
