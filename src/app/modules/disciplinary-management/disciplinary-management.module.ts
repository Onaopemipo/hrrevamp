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
  ]
})
export class DisciplinaryManagementModule { }
