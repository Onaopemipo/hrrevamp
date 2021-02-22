import { FullCalendarModule } from '@fullcalendar/angular';
import { ComponentsModule } from './../../../components/components.module';
import { InterviewerdashboardRoutingModule } from './interviewerdashboard-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NbCardModule, NbThemeModule, NbTabsetModule, NbOptionModule, NbSelectModule, NbCalendarModule } from '@nebular/theme';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { ApplicantselectionComponent } from './applicantselection/applicantselection.component';
import { JobdetailsComponent } from './jobdetails/jobdetails.component';



@NgModule({
  declarations: [DashboardComponent, ApplicantselectionComponent, JobdetailsComponent],
  imports: [
    CommonModule,
    InterviewerdashboardRoutingModule,
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
export class InterviewerdashboardModule { }
