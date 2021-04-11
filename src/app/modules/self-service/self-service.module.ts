import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'app/components/components.module';
import { SelfServiceRoutingModule } from './self-service-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NbStepperModule } from '@nebular/theme';
import { EmployeeeventsComponent } from './employeeevents/employeeevents.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { SelfServiceComponent } from './self-service.component';
import {NbPopoverModule} from '@nebular/theme';
import { ModalformComponent } from './modalform/modalform.component';
import { ThemeModule } from '../../@theme/theme.module';
import { ProfileComponent } from './profile/profile.component';
import { AddUpdateEventsServiceProxy,GetAllEventsServiceProxy} from '../../_services/service-proxies'
import { AlertserviceService, } from '../../_services/alertservice.service'
FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  listPlugin
]);

@NgModule({
    declarations: [DashboardComponent, EmployeeeventsComponent, SelfServiceComponent, ModalformComponent, ProfileComponent],
    imports: [
      CommonModule,
      ComponentsModule,
      SelfServiceRoutingModule,
      NbStepperModule,
      FullCalendarModule,
      NbPopoverModule,
      ThemeModule,
    ],
    providers: [
      AddUpdateEventsServiceProxy,
      AlertserviceService,
      GetAllEventsServiceProxy
    ]
  })
  export class SelfServiceModule { }

