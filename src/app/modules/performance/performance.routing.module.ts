import { HrReviewListComponent } from './page/hr-review-list/hr-review-list.component';
import { ReviewerReviewMainComponent } from './page/reviewer-review-main/reviewer-review-main.component';
import { PerformanceReviewMainComponent } from './page/performance-review-main/performance-review-main.component';
import { MyAppraisalCycleComponent } from './pages/my-appraisal-cycle/my-appraisal-cycle.component';
import { MyAppraisalsComponent } from './pages/my-appraisals/my-appraisals.component';
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
        path: 'my-appraisals',
        component: MyAppraisalsComponent,
      },
      {
        path: 'cycle',
        component: PerformanceManagementCycleComponent
      },
      {
        path: 'my-appraisals/cycle/:id',
        component: MyAppraisalCycleComponent,
      },
      {
        path: 'my-appraisals/cycle/:id/review',
        component: PerformanceReviewMainComponent,
      },
      {
        path: 'reviewer/cycle/:cycle_id/kra/:kra_id/employee/:employee_id/review',
        component: ReviewerReviewMainComponent,
      },
      {
        path: 'supervisor/reviews',
        component: HrReviewListComponent
      },
      {
        path: 'hr/reviews',
        component: HrReviewListComponent
      },
      {
        path: 'supervisor/cycle/:id/employee/:employee_id',
        component: MyAppraisalCycleComponent
      },
      {
        path: 'supervisor/cycle/:id/employee/:employee_id/review',
        component: PerformanceReviewMainComponent
      },

      {
        path: 'hr/cycle/:id/employee/:employee_id',
        component: MyAppraisalCycleComponent
      },
      {
        path: 'hr/cycle/:id/employee/:employee_id/review',
        component: PerformanceReviewMainComponent
      },
      {
        path: 'kra',
        component: KeyResultAreaComponent,
      },
      {
        path: 'kra/assign',
        component: AssignKraComponent,
      },
      {
        path: 'my-appraisals/kra/:id',
        component: SetKpiComponent,
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
        path: 'cycle/:cycle_id/kra/:kra_id/my-review',
        component: PerformanceReviewComponent,
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
