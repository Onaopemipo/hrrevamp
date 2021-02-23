import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BenefitComponent } from './benefit.component';
import { MedicalInsuranceComponent } from './medical-insurance/medical-insurance.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: BenefitComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
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
export class BenefitRoutingModule { }
