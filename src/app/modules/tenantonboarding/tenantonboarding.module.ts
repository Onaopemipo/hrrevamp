import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TenantonboardingRoutingModule } from './tenantonboarding-routing.module';
import { TenantonboardingComponent } from './tenantonboarding.component';
import {OnboardingsetupComponent } from './onboardingsetup/onboardingsetup.component';

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
  NbPopoverModule
} from '@nebular/theme';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { ComponentsModule } from 'app/components/components.module';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  declarations: [TenantonboardingComponent, OnboardingsetupComponent],
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
    NbPopoverModule
  ]
})
export class TenantonboardingModule { }
