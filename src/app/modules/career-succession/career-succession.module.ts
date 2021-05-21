import { GradeLevelServiceProxy, CompetencyServiceProxy, FetchEmployeeByIdServiceProxy, FetchAllEmployeesServiceProxy, FetchSuccessionPlanServiceProxy, CareerSuccessionServiceProxy, GetEmployeeebyGridBoxServiceProxy, GetGridBoxCountServiceProxy, TalentManagementServiceProxy, GetCareerSuccesionPlanByIdServiceProxy, DeleteSuccesionPlanServiceProxy, SearchEmployeesServiceProxy, EmployeePossibleSuccessorServiceProxy, DeleteEmployeefromCareerSuccessionplanServiceProxy } from './../../_services/service-proxies';
import { GetAllDepartmentsServiceProxy, CommonServiceProxy, RetirementServiceProxy } from 'app/_services/service-proxies';
import { ComponentsModule } from './../../components/components.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NbLayoutModule, NbCardModule, NbIconModule, NbSelectModule, NbCheckboxModule, NbProgressBarModule, NbFormFieldModule } from '@nebular/theme';
import { ThemeModule } from './../../@theme/theme.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareerSuccessionRoutingModule } from './career-succession-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportListComponent } from './report-list/report-list.component';
import { TrainingRecordComponent } from './training-record/training-record.component';
import { CompetencyComponent } from './competency/competency.component';
import { TalentPoolComponent } from './talent-pool/talent-pool.component';
import { RolesComponent } from './roles/roles.component';
import { PlanningComponent } from './planning/planning.component';
import { TreeComponent } from './tree/tree.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { CompareCompetencyComponent } from './compare-competency/compare-competency.component';
import { GridboxComponent } from './gridbox/gridbox.component';
import { TestpoolComponent } from './testpool/testpool.component';
import { TalentPoolService } from './services/talent-pool.service';
import { EmployeesService } from './services/employees.service';
import { NineBoxGridService } from './services/nine-box-grid.service';
import { NineGridBoxEmployeeComponent } from './nine-grid-box-employee/nine-grid-box-employee.component';
import { SuccessionPlanService } from './services/succession-plan.service';
import { SuccessionDashboardComponent } from './succession-dashboard/succession-dashboard.component';
import { NewCompetencyComponent } from './new-competency/new-competency.component';
import { AuthenticationService } from 'app/_services/authentication.service';
import { CareerSuccessionComponent } from './career-succession.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ReportListComponent,
    TrainingRecordComponent,
    CompetencyComponent,
    TalentPoolComponent,
    RolesComponent,
    PlanningComponent,
    TreeComponent,
    ProfileDetailsComponent,
    CompareCompetencyComponent,
    GridboxComponent,
    TestpoolComponent,
    NineGridBoxEmployeeComponent,
    SuccessionDashboardComponent,
    NewCompetencyComponent,
    CareerSuccessionComponent
  ],
  providers: [
    TalentPoolService,
    EmployeesService,
    NineBoxGridService,
    SuccessionPlanService,
    GetAllDepartmentsServiceProxy,
    CommonServiceProxy,
    GradeLevelServiceProxy,
    CompetencyServiceProxy,
    FetchEmployeeByIdServiceProxy,
    FetchAllEmployeesServiceProxy,
    FetchSuccessionPlanServiceProxy,
    CareerSuccessionServiceProxy,
    GetEmployeeebyGridBoxServiceProxy,
    GetGridBoxCountServiceProxy,
    TalentManagementServiceProxy,
    CompetencyServiceProxy,
    RetirementServiceProxy,
    GetCareerSuccesionPlanByIdServiceProxy,
    DeleteSuccesionPlanServiceProxy,
    AuthenticationService,
    SearchEmployeesServiceProxy,
    CommonServiceProxy,
    EmployeePossibleSuccessorServiceProxy,
    DeleteEmployeefromCareerSuccessionplanServiceProxy,
  ],
  imports: [
    CommonModule,
    CareerSuccessionRoutingModule,
    ThemeModule,
    NbLayoutModule,
    NbCardModule,
    NgxChartsModule,
    NgxEchartsModule,
    NbIconModule,
    NbSelectModule,
    NbCheckboxModule,
    ComponentsModule,
    NbProgressBarModule,
    NbFormFieldModule,
  ]
})
export class CareerSuccessionModule { }
