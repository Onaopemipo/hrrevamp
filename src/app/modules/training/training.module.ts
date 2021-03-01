import { FullCalendarModule } from '@fullcalendar/angular';
import { TrainingRoutingModule } from './training-routing.module';
import { ComponentsModule } from 'app/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RequestsComponent } from './requests/requests.component';
import { PlansComponent } from './plans/plans.component';
import { AdministrationComponent } from './administration/administration.component';

// import { NbLayoutModule , NbCardModule, NbIconModule, NbSelectModule } from '@nebular/theme';

import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  // NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbTreeGridModule,
  NbTabsetModule,
  NbTooltipModule,
  NbPopoverModule,
  NbAlertModule,
  NbSearchModule,
  NbCalendarKitModule,
  NbCalendarModule,
  NbCalendarRangeModule,
  NbProgressBarModule,
  NbSpinnerModule,
  NbListModule,



} from '@nebular/theme';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [DashboardComponent, RequestsComponent, PlansComponent, AdministrationComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    TrainingRoutingModule,
    NbTabsetModule,
    NbDatepickerModule,
    NbCardModule,
    NbSelectModule,
    NgxChartsModule,
    NgxEchartsModule,
    FullCalendarModule
  ]
})
export class TrainingModule { }
