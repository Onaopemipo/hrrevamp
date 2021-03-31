import { CreateLeaveByAdminServiceProxy, GetLeaveTypesServiceProxy, GetLeaveYearServiceProxy, GetLeaveYearsServiceProxy } from './../../_services/service-proxies';
import { ThemeModule } from './../../@theme/theme.module';
import { LeaveComponent } from './leave.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'app/components/components.module';
import { LeaveRoutingModule } from './leave.routing.module';
import { LeavePlanComponent } from './leave-plan/leave-plan.component';
import { FormsModule } from '@angular/forms';
import { NbCheckboxModule, NbDatepickerModule, NbSelectModule, } from '@nebular/theme';
import { LeavetypeComponent } from './leavetype/leavetype.component';
import { LeavehistoryComponent } from './leavehistory/leavehistory.component';
import {
  LeaveEntitlementServiceProxy,
  LeavePlanEventsServiceProxy,
  FetchLeavePlanServiceProxy,
  PostServiceProxy
} from '../../_services/service-proxies';
import { LeaveyearComponent } from './leaveyear/leaveyear.component';
import { AlertserviceService } from 'app/_services/alertservice.service';
@NgModule({
  declarations: [LeavePlanComponent, LeavetypeComponent, LeavehistoryComponent, LeaveComponent,LeaveyearComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    LeaveRoutingModule,
    FormsModule,
    NbCheckboxModule,
    NbDatepickerModule,
    ThemeModule,
    NbSelectModule

  ],
  providers: [
    LeaveEntitlementServiceProxy,
    LeavePlanEventsServiceProxy,
    FetchLeavePlanServiceProxy,
    PostServiceProxy,
    GetLeaveYearServiceProxy,
    GetLeaveTypesServiceProxy,
    AlertserviceService,
    GetLeaveYearsServiceProxy,
    CreateLeaveByAdminServiceProxy
   ]
})
export class LeaveModule { }
