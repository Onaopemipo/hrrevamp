import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HiringchecklistComponent } from './hiringchecklist/hiringchecklist.component';
const routes: Routes = [
  {
    path: '',
    component: HiringchecklistComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeemoduleRoutingModule { }
