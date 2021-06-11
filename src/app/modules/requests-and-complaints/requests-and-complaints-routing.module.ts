import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { RequestsAndComplaintsComponent } from './requests-and-complaints.component';
const routes: Routes = [
  {
    path: '',
    component: RequestsAndComplaintsComponent,
    children: [
      {
        path: 'main',
        component: MainComponent,
      },
      {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: MainComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestsAndComplaintsRoutingModule {}
