import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleSettingsRoutingModule } from './module-settings-routing.module';
import { ModuleSettingsComponent } from './module-settings.component';
import { ComponentsModule } from 'app/components/components.module';
import { ThemeModule } from 'app/@theme/theme.module';
import { DepartmentListComponent } from './pages/department-list/department-list.component';
import { SetUpsServiceProxy } from 'app/_services/service-proxies';
import { ApiService } from './services/api.service';
import { PageService } from './services/page.service';
import { BaseComponent } from './base/base.component';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { ConfirmBoxService } from 'app/_services/confirm-box.service';
import { SalaryScaleComponent } from './pages/salary-scale/department-list.component';
import { LocationListComponent } from './pages/location-list/location-list.component';
import { PositionListComponent } from './pages/position-list/position-list.component';
import { BenefitListComponent } from './pages/benefit-list/benefit-list.component';


@NgModule({
  declarations: [
    BenefitListComponent,
    DepartmentListComponent,
    LocationListComponent,
    ModuleSettingsComponent,
    PositionListComponent,
    SalaryScaleComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ModuleSettingsRoutingModule,
    ThemeModule,
  ],
  providers: [
    ApiService,
    PageService,
    SetUpsServiceProxy,
    AlertserviceService,
    ConfirmBoxService,
  ]
})
export class ModuleSettingsModule { }
