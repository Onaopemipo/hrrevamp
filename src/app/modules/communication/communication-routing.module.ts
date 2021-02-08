import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailLogComponent } from './page/email-log/email-log.component';
import { SettingsComponent } from './page/settings/settings.component';
import { TemplatesComponent } from './page/templates/templates.component';

const routes: Routes = [
  {
    path: '',
    component: EmailLogComponent
  },
  {
    path: 'templates',
    component: TemplatesComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunicationRoutingModule {}
