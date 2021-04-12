import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from './../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { NbAlertModule, NbCheckboxModule, NbDatepickerModule, NbSelectModule, } from '@nebular/theme';

import { ManpowerRoutingModule } from './manpower-routing.module';
import { ManpowerComponent } from './manpower.component';
import { CapacityPlanningComponent } from './capacity-planning/capacity-planning.component';
import { ProjectionReportComponent } from './projection-report/projection-report.component';
import { ComponentsModule } from 'app/components/components.module';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { DataServiceProxy, ManpowerServiceProxy } from 'app/_services/service-proxies';


@NgModule({
  declarations: [ManpowerComponent, CapacityPlanningComponent, ProjectionReportComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    ManpowerRoutingModule,
    FormsModule,
    NbCheckboxModule,
    NbDatepickerModule,
    ThemeModule,
    NbSelectModule,
    NbAlertModule
  ],
  providers: [
    AlertserviceService,
    DataServiceProxy,
    ManpowerServiceProxy
  ]
})
export class ManpowerModule { }
