import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';
import { ModulesComponent } from './modules.component';

import { NbLayoutModule , NbCardModule, NbIconModule, NbSelectModule , NbCheckboxModule} from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';

import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { ComponentsModule } from 'app/components/components.module';
import { TablecomponentComponent } from 'app/components/tablecomponent/tablecomponent.component';
import { TableheaderComponent } from 'app/components/tableheader/tableheader.component';
import { ComponentsheaderComponent } from 'app/components/componentsheader/componentsheader.component';





@NgModule({
  declarations: [ModulesComponent, DashboardComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    ModulesRoutingModule,
    ThemeModule,
    NbLayoutModule,
    NbCardModule,
    NgxChartsModule,
    NgxEchartsModule,
    NbIconModule,
    NbSelectModule,
    NbCheckboxModule
  ]
})
export class ModulesModule { }
