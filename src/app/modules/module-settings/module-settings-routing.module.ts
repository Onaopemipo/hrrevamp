import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleSettingsComponent } from './module-settings.component';
import { DepartmentListComponent } from './pages/department-list/department-list.component';

const routes: Routes = [
  {
    path: '',
    component: ModuleSettingsComponent,
    children: [
      {
        path: 'department',
        component: DepartmentListComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleSettingsRoutingModule { }
