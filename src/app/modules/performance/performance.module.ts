import { NbRadioModule } from '@nebular/theme';
import { ReviewerReviewMainComponent } from './page/reviewer-review-main/reviewer-review-main.component';
import { PerformanceReviewMainComponent } from './page/performance-review-main/performance-review-main.component';
import { MyAppraisalCycleComponent } from './pages/my-appraisal-cycle/my-appraisal-cycle.component';
import { GetEmployeeAppraisalHistoriesServiceProxy, EmployeeCycleKrasServiceProxy, GetEmployeePerformanceReviewServiceProxy, EmployeePerformanceReviewServiceProxy, SubmitEmployeeAppraisalReviewServiceProxy, SubmitPerformanceReviewServiceProxy, ReviewRecommendationsServiceProxy, SubmitHRAppraisalReviewServiceProxy, GetHRAppraisalReviewsServiceProxy } from './../../_services/service-proxies';
import { MyAppraisalsComponent } from './pages/my-appraisals/my-appraisals.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerformanceComponent } from './performance.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ComponentsModule } from 'app/components/components.module';
import { ThemeModule } from 'app/@theme/theme.module';
import { PerformanceRoutingModule } from './performance.routing.module';
import { PerformanceManagementCycleComponent } from './pages/performance-management-cycle/performance-management-cycle.component';
import { WorkflowComponent } from './components/workflow/workflow.component';
import { SetKpiComponent } from './page/set-kpi/set-kpi.component';
import { KeyResultAreaComponent } from './pages/key-result-area/key-result-area.component';
import { AssignKraComponent } from './page/assign-kra/assign-kra.component';
import { PerformanceReviewComponent } from './page/performance-review/performance-review.component';
import { ScoreCardComponent } from './page/score-card/score-card.component';
import { RatingComponent } from './page/rating/rating.component';
import { PerformanceReviewsComponent } from './pages/performance-reviews/performance-reviews.component';
import { PerformanceMatrixComponent } from './pages/performance-matrix/performance-matrix.component';
import { AppraisalComponent } from './pages/appraisal/appraisal.component';
import { PerformanceManagementService } from './services/performance-management.service';
import { AddUpdateKPIServiceProxy, AddUpdatePerformanceCycleServiceProxy, AssignKRAServiceProxy, CreateKeyResultAreaServiceProxy, FetchKeyResultAreaServiceProxy, FetchKeyResultAreasServiceProxy, FetchKPIsServiceProxy, FetchPerformanceCyclesServiceProxy, SubordinateAppraisalsServiceProxy,
  SavePerformanceReviewServiceProxy,
  SaveEmployeeAppraisalReviewServiceProxy, } from 'app/_services/service-proxies';
import { KeyResultAreaService } from './services/key-result-area.service';
import { AppraisalService } from './services/appraisal.service';
import { KpiService } from './services/kpi.service';



@NgModule({
  declarations: [
    AppraisalComponent,
    AssignKraComponent,
    DashboardComponent,
    KeyResultAreaComponent,
    PerformanceComponent,
   PerformanceManagementCycleComponent,
    PerformanceMatrixComponent,
    PerformanceReviewComponent,
    PerformanceReviewsComponent,
    RatingComponent,
    SetKpiComponent,
    ScoreCardComponent,
    MyAppraisalsComponent,
    MyAppraisalCycleComponent,
    WorkflowComponent,
    PerformanceReviewMainComponent,
    ReviewerReviewMainComponent,
  ],
  providers: [
   PerformanceManagementService,
    FetchPerformanceCyclesServiceProxy,
    AddUpdatePerformanceCycleServiceProxy,
    CreateKeyResultAreaServiceProxy,
    FetchKeyResultAreasServiceProxy,
    FetchKeyResultAreaServiceProxy,
    SubordinateAppraisalsServiceProxy,
    AssignKRAServiceProxy,
    KeyResultAreaService,
    KpiService,
    AddUpdateKPIServiceProxy,
    FetchKPIsServiceProxy,
    AppraisalService,
    GetEmployeeAppraisalHistoriesServiceProxy,
    GetEmployeePerformanceReviewServiceProxy,
    EmployeePerformanceReviewServiceProxy,
    SubmitEmployeeAppraisalReviewServiceProxy,
    SubmitPerformanceReviewServiceProxy,
    EmployeeCycleKrasServiceProxy,
    SavePerformanceReviewServiceProxy,
    SaveEmployeeAppraisalReviewServiceProxy,
    ReviewRecommendationsServiceProxy,
    SubmitHRAppraisalReviewServiceProxy,
    GetHRAppraisalReviewsServiceProxy,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ThemeModule,
    PerformanceRoutingModule,
    NbRadioModule,
  ]
})
export class PerformanceModule { }
