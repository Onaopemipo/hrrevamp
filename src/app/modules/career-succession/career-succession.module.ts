import { ComponentsModule } from './../../components/components.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NbLayoutModule, NbCardModule, NbIconModule, NbSelectModule, NbCheckboxModule, NbProgressBarModule } from '@nebular/theme';
import { ThemeModule } from './../../@theme/theme.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareerSuccessionRoutingModule } from './career-succession-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportListComponent } from './report-list/report-list.component';
import { TrainingRecordComponent } from './training-record/training-record.component';
import { CompetencyComponent } from './competency/competency.component';
import { TalentPoolComponent } from './talent-pool/talent-pool.component';
import { RolesComponent } from './roles/roles.component';
import { PlanningComponent } from './planning/planning.component';


@NgModule({
  declarations: [DashboardComponent, ReportListComponent, TrainingRecordComponent, CompetencyComponent, TalentPoolComponent, RolesComponent, PlanningComponent],
  imports: [
    CommonModule,
    CareerSuccessionRoutingModule,
    ThemeModule,
    NbLayoutModule,
    NbCardModule,
    NgxChartsModule,
    NgxEchartsModule,
    NbIconModule,
    NbSelectModule,
    NbCheckboxModule,
    ComponentsModule,
    NbProgressBarModule
  ]
})
export class CareerSuccessionModule { }
