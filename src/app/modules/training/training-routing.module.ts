import { RequestsComponent } from './requests/requests.component';
import { PlansComponent } from './plans/plans.component';
import { AdministrationComponent } from './administration/administration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CategoriesComponent } from './categories/categories.component';
import { SpecializationComponent } from './specialization/specialization.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'administration',
    component: AdministrationComponent
  },

  {
    path: 'categories',
    component: CategoriesComponent
  },

  {
    path: 'specializations',
    component: SpecializationComponent
  },

  {
    path: 'plans',
    component: PlansComponent
  },

  {
    path: 'requests',
    component: RequestsComponent
  },

  {
    path: 'administration',
    component: AdministrationComponent
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: DashboardComponent,
  },

];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingRoutingModule {
}
