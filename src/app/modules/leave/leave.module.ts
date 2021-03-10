import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'app/components/components.module';
import { LeaveRoutingModule } from './leave.routing.module';
import { LeavePlanComponent } from './leave-plan/leave-plan.component';
import { FormsModule } from '@angular/forms';
import { NbCheckboxModule, NbDatepickerModule } from '@nebular/theme';
import { LeavetypeComponent } from './leavetype/leavetype.component';
import { LeavehistoryComponent } from './leavehistory/leavehistory.component';
import {
  LeaveEntitlementServiceProxy,
  LeaveplaneEventServiceProxy,
  FetchLeavePlanServiceProxy} from '../../_services/service-proxies';

@NgModule({
  declarations: [LeavePlanComponent, LeavetypeComponent, LeavehistoryComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    LeaveRoutingModule,
    FormsModule,
    NbCheckboxModule,
    NbDatepickerModule

  ],
  providers: [
    LeaveEntitlementServiceProxy,
    LeaveplaneEventServiceProxy,
    FetchLeavePlanServiceProxy]
})
export class LeaveModule { }
