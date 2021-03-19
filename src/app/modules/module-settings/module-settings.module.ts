import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleSettingsRoutingModule } from './module-settings-routing.module';
import { ModuleSettingsComponent } from './module-settings.component';
import { ComponentsModule } from 'app/components/components.module';
import { ThemeModule } from 'app/@theme/theme.module';
import { DepartmentListComponent } from './pages/department-list/department-list.component';
import { AddUpdateDepartmentServiceProxy, AddUpdateLocationServiceProxy, DataServiceProxy, GetAllDepartmentsServiceProxy, GetAllLocationsServiceProxy, GetDepartmentByIdServiceProxy, GetLocationByIdServiceProxy } from 'app/_services/service-proxies';
import { ApiService } from './services/api.service';
import { PageService } from './services/page.service';
// import { BaseComponent } from './base/base.component';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { ConfirmBoxService } from 'app/_services/confirm-box.service';
import { LocationListComponent } from './pages/location-list/location-list.component';
import { PositionListComponent } from './pages/position-list/position-list.component';
import { JobRoleComponent } from './pages/job-role/job-role.component';
import { SalaryScaleComponent } from './pages/salary-scale/salary-scale.component';
import { LocationService } from './services/location.service';
import { SalaryScaleService } from './services/salary-scale.service';
import { SalaryGradesComponent } from './pages/salary-grades/salary-grades.component';
import { SalaryGradeService } from './services/salary-grades.service';
import { GradeStepComponent } from './pages/grade-step/grade-step.component';
import { GradeStepService } from './services/salary-grade-step.service';
import { EventsComponent } from './pages/events/events.component';
import { EventService } from './services/events.service';
import { GenericComponent } from './pages/generic/generic.component';
import { RequestComponent } from './pages/request/request.component';
import { SystemoptionComponent } from './pages/systemoption/systemoption.component';
import { RequestService } from './services/Requestservice';
import { GenericService } from './services/generic.service';
import { SystemOptionService } from './services/systemoptionservice';


// import { SalaryScaleComponent } from './pages/salary-scale/department-list.component';
// import { LocationListComponent } from './pages/location-list/location-list.component';
// import { PositionListComponent } from './pages/position-list/position-list.component';
// import { BenefitListComponent } from './pages/benefit-list/benefit-list.component';


@NgModule({
  declarations: [
    // BenefitListComponent,
    DepartmentListComponent,
    // LocationListComponent,
    ModuleSettingsComponent,
    LocationListComponent,
    PositionListComponent,
    JobRoleComponent,
    SalaryScaleComponent,
    SalaryGradesComponent,
    GradeStepComponent,
    EventsComponent,
    GenericComponent,
    RequestComponent,
    SystemoptionComponent,    
    // PositionListComponent,
    // SalaryScaleComponent,
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
    GetAllDepartmentsServiceProxy,
    GetDepartmentByIdServiceProxy,
    AddUpdateDepartmentServiceProxy,
    AlertserviceService,
    ConfirmBoxService,
    LocationService,
    DataServiceProxy,
    GetAllLocationsServiceProxy,
    GetLocationByIdServiceProxy,
    AddUpdateLocationServiceProxy,
    SalaryScaleService,
    SalaryGradeService,
    GradeStepService,
    EventService,
    RequestService,
    GenericService,
    SystemOptionService,
  ]
})
export class ModuleSettingsModule { }
