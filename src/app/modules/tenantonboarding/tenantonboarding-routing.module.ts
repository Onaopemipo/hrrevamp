import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TenantonboardingComponent } from './tenantonboarding.component';
import { OnboardingsetupComponent } from './onboardingsetup/onboardingsetup.component';

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
