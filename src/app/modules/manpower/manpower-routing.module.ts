import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManpowerComponent } from './manpower.component';
import { CapacityPlanningComponent } from './capacity-planning/capacity-planning.component';
import { ProjectionReportComponent } from './projection-report/projection-report.component';

const routes: Routes = [
 { path: '',
    component: ManpowerComponent,
    children: [
      {
        path: 'capacityplanning',
        component: CapacityPlanningComponent,
      },
      {
        path: 'projectionreport',
        component: ProjectionReportComponent,
      },
      {
        path: '',
        redirectTo: 'capacityplanning',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: CapacityPlanningComponent,
      },
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManpowerRoutingModule { }
