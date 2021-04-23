import { NewCompetencyComponent } from './new-competency/new-competency.component';
import { SuccessionDashboardComponent } from './succession-dashboard/succession-dashboard.component';
import { GridboxComponent } from './gridbox/gridbox.component';
import { TestpoolComponent } from './testpool/testpool.component';
import { CompareCompetencyComponent } from './compare-competency/compare-competency.component';
import { PlanningComponent } from './planning/planning.component';
import { RolesComponent } from './roles/roles.component';
import { TrainingRecordComponent } from './training-record/training-record.component';
import { ReportListComponent } from './report-list/report-list.component';
import { TalentPoolComponent } from './talent-pool/talent-pool.component';
import { CompetencyComponent } from './competency/competency.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NineGridBoxEmployeeComponent } from './nine-grid-box-employee/nine-grid-box-employee.component';
import { SucessionPlanDetailComponent } from './sucession-plan-detail/sucession-plan-detail.component';
import { CareerSuccessionComponent } from './career-succession.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';

const routes: Routes = [
  {
    path: '',
    component: CareerSuccessionComponent,
    children: [
      {
        path: '',
        component: SuccessionDashboardComponent

      },
      {
        path: 'profiledetails/:id',
        component: ProfileDetailsComponent
      },

      {
        path: 'competency',
        component: CompetencyComponent
      },

      {
        path: 'talent-pool',
        component: TalentPoolComponent
      },

      {
          path: 'report-list',
          component: ReportListComponent
      },

      {
        path: 'training-record',
        component: TrainingRecordComponent
      },

      {
          path: 'roles',
          component: RolesComponent
      },

      {
          path: 'planning',
          component: PlanningComponent
      },

      {
        path: 'compare-competency',
        component: CompareCompetencyComponent
      },

      {
        path: 'talentpool/:id',
        component: TestpoolComponent

      },

      {
        path: 'gridbox',
        component: GridboxComponent
      },

      {
        path: 'succession/:id',
        component: SucessionPlanDetailComponent,
      },

      {
        path: 'gridbox/:id',
        component: NineGridBoxEmployeeComponent
      },

      {
        path: 'new-competency',
        component: NewCompetencyComponent
      },

      { path: '', redirectTo: 'request', pathMatch: 'full' },
    { path: '**', redirectTo: 'request' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CareerSuccessionRoutingModule { }
