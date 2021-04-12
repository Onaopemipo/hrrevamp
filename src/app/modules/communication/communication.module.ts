import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'app/components/components.module';
import { EmailLogComponent } from './page/email-log/email-log.component';
import { CommunicationRoutingModule } from './communication-routing.module';
import { TemplatesComponent } from './page/templates/templates.component';
import { SettingsComponent } from './page/settings/settings.component';
import { ApiService } from './api.service';
import { MailDetailComponent } from './page/mail-detail/mail-detail.component';
import { CommunicationServiceProxy } from 'app/_services/service-proxies';

import {
  NbIconModule,
} from '@nebular/theme';


@NgModule({
  declarations: [EmailLogComponent, TemplatesComponent, SettingsComponent, MailDetailComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    CommunicationRoutingModule,
    NbIconModule
  ],
  providers: [
    ApiService,
    CommunicationServiceProxy
  ]
})
export class CommunicationModule { }
