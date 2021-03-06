import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: 'onboarding',
    loadChildren: () => import('./modules/tenantonboarding/tenantonboarding.module')
    .then(m => m.TenantonboardingModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },

  {
    path: 'recruitment',
      loadChildren: () => import('./modules/recruitment/recruitment.module')
      .then(m => m.RecruitmentModule)
  },
  {
    path: 'accountverify',
    loadChildren: () => import('./modules/recruitment/account-verify/accountverify.module')
    .then(m => m.AccountVerifyModule)
  },
  {
    path: 'applicantsmodule',
    loadChildren: () => import('./modules/applicant-module/applicant-module.module')
    .then(m => m.ApplicantModuleModule)
  },
  {
    path: '',
    loadChildren: () => import('./modules/modules.module').then(m => m.ModulesModule),
  },


   { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
