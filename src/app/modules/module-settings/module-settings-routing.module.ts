import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleSettingsComponent } from './module-settings.component';
// import { BenefitListComponent } from './pages/benefit-list/benefit-list.component';
import { DepartmentListComponent } from './pages/department-list/department-list.component';
import { LocationListComponent } from './pages/location-list/location-list.component';
// import { PositionListComponent } from './pages/position-list/position-list.component';

const routes: Routes = [
  {
    path: '',
    component: ModuleSettingsComponent,
    children: [
      // {
      //   path: 'benefit',
      //   component: BenefitListComponent,
      // },
      {
        path: 'department',
        component: DepartmentListComponent,
      },
      {
        path: 'location',
        component: LocationListComponent,
      },
      // {
      //   path: 'position',
      //   component: PositionListComponent,
      // },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleSettingsRoutingModule { }
