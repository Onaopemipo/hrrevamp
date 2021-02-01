import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ComponentsModule } from 'app/components/components.module';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [AuthComponent,LoginComponent],
  imports: [
    ComponentsModule,
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
