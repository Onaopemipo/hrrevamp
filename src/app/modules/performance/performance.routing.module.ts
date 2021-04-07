import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PerformanceComponent } from './performance.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PerformanceManagementCycleComponent } from './pages/performance-management-cycle/performance-management-cycle.component';
import { SetKpiComponent } from './page/set-kpi/set-kpi.component';
import { KeyResultAreaComponent } from './pages/key-result-area/key-result-area.component';
import { AssignKraComponent } from './page/assign-kra/assign-kra.component';
import { PerformanceReviewComponent } from './page/performance-review/performance-review.component';
import { ScoreCardComponent } from './page/score-card/score-card.component';
import { RatingComponent } from './page/rating/rating.component';
import { AppraisalComponent } from './pages/appraisal/appraisal.component';
import { PerformanceMatrixComponent } from './pages/performance-matrix/performance-matrix.component';
import { PerformanceReviewsComponent } from './pages/performance-reviews/performance-reviews.component';

export const routes: Routes = [
  {
    path: '',
    component: PerformanceComponent,
    children: [
        {
            path: '',
            component: DashboardComponent
        },

        {
            path: 'appraisals',
            component: AppraisalComponent,
        },
        {
            path: 'cycle',
            component: PerformanceManagementCycleComponent
        },
        {
            path: 'kra',
            component: KeyResultAreaComponent,
        },
        {
            path: 'kra/:id/assign',
            component: AssignKraComponent,
        },
        {
            path: 'kra/:id/kpi',
            component: SetKpiComponent,
        },
        {
            path: 'matrix',
            component: PerformanceMatrixComponent,
        },
        {
            path: 'performance',
            component: PerformanceReviewComponent,
        },
        {
            path: 'reviews',
            component: PerformanceReviewsComponent,
        },
        {
            path: 'rating',
            component: RatingComponent,
        },
        {
            path: 'score-card',
            component: ScoreCardComponent,
        },
    ],
  }




  // { path: '', redirectTo: 'auth', pathMatch: 'full' },
  // { path: '**', redirectTo: 'auth' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerformanceRoutingModule { }
