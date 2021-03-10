import { LeaveComponent } from './leave.component';
import { Route } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeavePlanComponent } from './leave-plan/leave-plan.component';
import { LeavetypeComponent } from './leavetype/leavetype.component';
import { LeavehistoryComponent } from './leavehistory/leavehistory.component';

const routes: Routes = [
    {
        path: '',
        component: LeaveComponent,
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
            component: LeavePlanComponent
          }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class LeaveRoutingModule {}
