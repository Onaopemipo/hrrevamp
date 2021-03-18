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

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
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
    path: 'test-pool',
    component: TestpoolComponent

  },
  {
    path: 'gridbox',
    component: GridboxComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CareerSuccessionRoutingModule { }
