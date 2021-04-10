import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleSettingsComponent } from './module-settings.component';
// import { BenefitListComponent } from './pages/benefit-list/benefit-list.component';
import { DepartmentListComponent } from './pages/department-list/department-list.component';
import { LocationListComponent } from './pages/location-list/location-list.component';
import { PositionListComponent } from './pages/position-list/position-list.component';
import { SalaryScaleComponent } from './pages/salary-scale/salary-scale.component';
import { SalaryGradesComponent } from './pages/salary-grades/salary-grades.component';
import { GradeStepComponent } from './pages/grade-step/grade-step.component';
// import { PositionListComponent } from './pages/position-list/position-list.component';
import { EventsComponent } from './pages/events/events.component';
import { GenericComponent } from './pages/generic/generic.component';
import { RequestComponent } from './pages/request/request.component';
import { SystemoptionComponent } from './pages/systemoption/systemoption.component';
import { system } from 'faker';
import { JobRoleComponent } from './pages/job-role/job-role.component';


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
      {
        path: 'job-role',
        component: JobRoleComponent,
      },      {
        path: 'position',
        component: PositionListComponent,
      },
      {
        path: 'salary-scale',
        component: SalaryScaleComponent,
      },
      {
        path: 'salary-grade',
        component: SalaryGradesComponent,
      },
      {
        path: 'salery-grade/:id/steps',
        component: GradeStepComponent,
      },
      {
        path: 'event',
        component: EventsComponent,
      },
      {
        path: 'generic',
        component: GenericComponent,
      },
      {
        path: 'systemoption',
        component: SystemoptionComponent,
      },
      {
        path: 'request',
        component: RequestComponent,
      },
      // {
      //   path: 'location',
      //   component: LocationListComponent,
      // },
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
