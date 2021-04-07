import { LeaveComponent } from './leave.component';
import { Route } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeavePlanComponent } from './leave-plan/leave-plan.component';
import { LeavetypeComponent } from './leavetype/leavetype.component';
import { LeavehistoryComponent } from './leavehistory/leavehistory.component';
import { LeaveyearComponent } from './leaveyear/leaveyear.component';
import { AuthGuardService as AuthGuard } from '../../_services/auth-guard.service';
const routes: Routes = [
    {
        path: '',
    component: LeaveComponent,
    canLoad: [AuthGuard],
        children: [

          {
            path: 'type',
            component: LeavetypeComponent,
          },
          {
              path: 'history',
              component: LeavehistoryComponent,
          },

          {
            path: 'plan',
            component: LeavePlanComponent,
          },
          {
            path: 'leaveyear',
            component: LeaveyearComponent
          },
          {
            path: '',
            redirectTo: 'history',
            pathMatch: 'full',
          },
          {
            path: '**',
            component: LeavehistoryComponent,
          },

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class LeaveRoutingModule {}
