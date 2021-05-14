import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisciplinaryManagementComponent } from './disciplinary-management/disciplinary-management.component';
import { CreateComponent } from './pages/create/create.component';
import { DisciplinaryManagementLogComponent } from './pages/disciplinary-management-log/disciplinary-management-log.component';
import { MainComponent } from './pages/main/main.component';
// import { SelfServiceComponent } from './self-service.component';
const routes: Routes = [
  {
    path: '',
    component: DisciplinaryManagementComponent,
    children: [
      {
        path: 'disciplinaryandreward/:type',
        component: MainComponent,
      },
      {
        path: 'log/:type',
        component: DisciplinaryManagementLogComponent,
      },
      {
        path: 'create/:type',
        component: CreateComponent,
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisciplinaryManagementRoutingModule {}
