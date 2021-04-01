import { NgModule } from '@angular/core';
import { AddUpdateDepartmentServiceProxy,     AddUpdatePositionServiceProxy,
  GetAllPositionsServiceProxy, AddUpdateLocationServiceProxy, DataServiceProxy,
  GetAllDepartmentsServiceProxy, GetAllLocationsServiceProxy,
  GetRequestTypeByIdServiceProxy,
    AddUpdateRequestTypeServiceProxy,
    GetAllRequestTypeServiceProxy,
    DeleteRequestTypeServiceProxy,
    GetEventsByIdServiceProxy,
    AddUpdateEventsServiceProxy,
    GetAllEventsServiceProxy,
    DeleteEventsServiceProxy,
  GetDepartmentByIdServiceProxy,
  GetLocationByIdServiceProxy,
  GetAllJobRolesServiceProxy,
  AddUpdateJobRolesServiceProxy,
  DeleteJobRoleServiceProxy,
  SalaryscaleServiceProxy,
} from 'app/_services/service-proxies';
import { ApiService } from './services/api.service';
import { PageService } from './services/page.service';
// import { BaseComponent } from './base/base.component';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { ConfirmBoxService } from 'app/_services/confirm-box.service';
import { LocationService } from './services/location.service';
import { SalaryScaleService } from './services/salary-scale.service';
import { SalaryGradeService } from './services/salary-grades.service';
import { GradeStepService } from './services/salary-grade-step.service';
import { EventService } from './services/events.service';
import { RequestService } from './services/Requestservice';
import { GenericService } from './services/generic.service';
import { SystemOptionService } from './services/systemoptionservice';
import { PositionService } from './services/position.service';
import { JobRoleService } from './services/job-role.service';
import { DepartmentsService } from './services/departments.service';


@NgModule({
  declarations: [
  ],
  imports: [
  ],
  providers: [
    ApiService,
    PageService,
    GetAllDepartmentsServiceProxy,
    GetDepartmentByIdServiceProxy,
    AddUpdateDepartmentServiceProxy,
    AddUpdatePositionServiceProxy,
    GetAllPositionsServiceProxy,
    AlertserviceService,
    ConfirmBoxService,
    LocationService,
    DepartmentsService,
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
    PositionService,
    GetAllJobRolesServiceProxy,
    AddUpdateJobRolesServiceProxy,
    DeleteJobRoleServiceProxy,
    JobRoleService,
    SalaryscaleServiceProxy,
    GetRequestTypeByIdServiceProxy,
    AddUpdateRequestTypeServiceProxy,
    GetAllRequestTypeServiceProxy,
    DeleteRequestTypeServiceProxy,
    GetEventsByIdServiceProxy,
    AddUpdateEventsServiceProxy,
    GetAllEventsServiceProxy,
    DeleteEventsServiceProxy,
  ]
})
export class ModuleSettingsProvidersModule { }
