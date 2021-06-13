import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisciplinaryManagementComponent } from './disciplinary-management/disciplinary-management.component';
import { ThemeModule } from 'app/@theme/theme.module';
import { ComponentsModule } from 'app/components/components.module';
import { DisciplinaryManagementRoutingModule } from './disciplinary-management.routing.module';
import { MainComponent } from './pages/main/main.component';
import { DisciplineEditComponent } from './components/discipline-edit/discipline-edit.component';
import { CreateComponent } from './pages/create/create.component';
import { DisciplinaryManagementLogComponent } from './pages/disciplinary-management-log/disciplinary-management-log.component';
import {
  AddUpdateDisciplineManagementServiceProxy,
  AddUpdateDisciplineTemplateServiceProxy, AddUpdateDisciplineTypeServiceProxy,AddUpdateDisciplineTypesRulesServiceProxy,CommunicationServiceProxy,
  DataServiceProxy,
  DeleteDisciplineTemplatesServiceProxy,
  DeleteDisciplineTypesRulesServiceProxy,
  FetchDisciplineLogByIdServiceProxy,
  FetchDisciplineLogServiceProxy,
  FetchDisciplineTemplatesServiceProxy, FetchEmployeeByIdServiceProxy, GetAllDisciplineTypesServiceProxy, UploadDocumentServiceProxy
} from 'app/_services/service-proxies';
import { AlertserviceService } from 'app/_services/alertservice.service';


@NgModule({
  declarations: [
    CreateComponent,
    DisciplinaryManagementComponent,
    DisciplinaryManagementLogComponent,
    DisciplineEditComponent,
    MainComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    DisciplinaryManagementRoutingModule,
    ThemeModule,
  ],
  providers: [
    GetAllDisciplineTypesServiceProxy,
    AddUpdateDisciplineTypeServiceProxy,
    AlertserviceService,
    FetchDisciplineTemplatesServiceProxy,
    AddUpdateDisciplineTemplateServiceProxy,
    CommunicationServiceProxy,
    UploadDocumentServiceProxy,
    DataServiceProxy,
    DeleteDisciplineTemplatesServiceProxy,
    AddUpdateDisciplineTypesRulesServiceProxy,
    DeleteDisciplineTypesRulesServiceProxy,
    AddUpdateDisciplineManagementServiceProxy,
    FetchDisciplineLogServiceProxy,
    FetchDisciplineLogByIdServiceProxy,
    FetchEmployeeByIdServiceProxy
  ]
})
export class DisciplinaryManagementModule { }
