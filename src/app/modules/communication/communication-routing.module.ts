import { CommunicationComponent } from './communication/communication.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailLogComponent } from './page/email-log/email-log.component';
import { MailDetailComponent } from './page/mail-detail/mail-detail.component';
import { SettingsComponent } from './page/settings/settings.component';
import { TemplatesComponent } from './page/templates/templates.component';

const routes: Routes = [
  {
    path: '',
    component: CommunicationComponent,
    children: [
      {
        path: '',
        component: EmailLogComponent
      },
      {
        path: 'email/:id/detail',
        component: MailDetailComponent,
      },
      {
        path: 'templates',
        component: TemplatesComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunicationRoutingModule {}
