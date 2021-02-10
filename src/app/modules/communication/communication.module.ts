import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'app/components/components.module';
import { EmailLogComponent } from './page/email-log/email-log.component';
import { CommunicationRoutingModule } from './communication-routing.module';
import { TemplatesComponent } from './page/templates/templates.component';
import { SettingsComponent } from './page/settings/settings.component';
import { ApiService } from './api.service';
import { MailDetailComponent } from './page/mail-detail/mail-detail.component';



@NgModule({
  declarations: [EmailLogComponent, TemplatesComponent, SettingsComponent, MailDetailComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    CommunicationRoutingModule,
  ],
  providers: [
    ApiService
  ]
})
export class CommunicationModule { }
