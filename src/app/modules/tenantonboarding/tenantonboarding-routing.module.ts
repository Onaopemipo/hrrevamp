import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TenantonboardingComponent } from './tenantonboarding.component';
import { OnboardingsetupComponent } from './onboardingsetup/onboardingsetup.component';
import { EmployeeofferComponent } from '../employeemodule/employeeoffer/employeeoffer.component';
import { EmployeeonboardingprofileComponent } from './employeeonboardingprofile/employeeonboardingprofile.component';
const routes: Routes = [
  {
    path: '',
    component: TenantonboardingComponent,
    children: [
      {
        path: 'accountsetup',
        component: OnboardingsetupComponent,
      },
      {
        path: 'myoffer',
        component: EmployeeofferComponent,
      },
      {
        path: 'employeeonboardingprofile',
        component: EmployeeonboardingprofileComponent,
      },

      {
        path: '',
        redirectTo: 'accountsetup',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: OnboardingsetupComponent,
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantonboardingRoutingModule { }
