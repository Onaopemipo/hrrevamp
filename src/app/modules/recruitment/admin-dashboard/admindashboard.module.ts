import { AdminDashboardRoutingModule } from './admindashboard-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ComponentsModule } from '../../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NbCardModule, NbThemeModule, NbTabsetModule, NbOptionModule, NbSelectModule, NbCalendarModule } from '@nebular/theme';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxEchartsModule } from 'ngx-echarts';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    NbCardModule,
    ComponentsModule,
    NbThemeModule,
    NgxChartsModule,
    NgxEchartsModule,
    NbTabsetModule,
    NbOptionModule,
    NbSelectModule,
    FullCalendarModule,
    NbCalendarModule
  ]
})
export class AdminDashboardModule { }
