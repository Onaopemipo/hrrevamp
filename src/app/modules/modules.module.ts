import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';
import { ModulesComponent } from './modules.component';

import { NbIconModule, NbLayoutModule, NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';

import { DashboardComponent } from '../pages/dashboard/dashboard.component';


@NgModule({
  declarations: [ModulesComponent, DashboardComponent],
  imports: [
    CommonModule,
    ModulesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbLayoutModule,
    NbIconModule

  ]
})
export class ModulesModule { }
