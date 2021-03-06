import { ApplicantsComponent } from './applicants/applicants.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicantModuleComponent } from './applicant-module.component';
const routes: Routes = [
  {
    path: '',
    component: ApplicantModuleComponent,
    children: [
      {
        path: 'applicants',
        component: ApplicantsComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicantModuleRoutingModule { }
