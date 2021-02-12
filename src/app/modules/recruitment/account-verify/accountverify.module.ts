import { EmailOTPVerifyComponent } from './../email-otpverify/email-otpverify.component';
import { AccountVerifyRoutingModule } from './accountverify-routing.module';
import { AccountVerifyComponent } from './account-verify.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../../@theme/theme.module';
import { ComponentsModule } from 'app/components/components.module';

import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
} from '@nebular/theme';
import { FormsModule as ngFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AccountVerifyComponent, EmailOTPVerifyComponent],
  imports: [
    ThemeModule,
    CommonModule,
    ngFormsModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbInputModule,
    NbIconModule,
    ComponentsModule,
    AccountVerifyRoutingModule
  ]
})
export class AccountVerifyModule { }
