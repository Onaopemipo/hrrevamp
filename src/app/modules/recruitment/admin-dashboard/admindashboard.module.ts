import { AdminDashboardRoutingModule } from './admindashboard-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ComponentsModule } from '../../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NbCardModule, NbThemeModule, NbTabsetModule, NbOptionModule, NbSelectModule, NbCalendarModule, NbRadioComponent, NbRadioModule } from '@nebular/theme';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { JobsComponent } from './jobs/jobs.component';
import { ReportsComponent } from './reports/reports.component';
import { SettingsComponent } from './settings/settings.component';
import { QuizComponent } from './quiz/quiz.component';



@NgModule({
  declarations: [DashboardComponent, JobsComponent, ReportsComponent, SettingsComponent, QuizComponent],
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
    NbCalendarModule,
    NbRadioModule
  ]
})
export class AdminDashboardModule { }
