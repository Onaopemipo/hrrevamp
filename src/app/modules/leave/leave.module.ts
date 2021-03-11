import { ThemeModule } from './../../@theme/theme.module';
import { LeaveComponent } from './leave.component';
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
  FetchLeavePlanServiceProxy,
  PostServiceProxy } from '../../_services/service-proxies';

@NgModule({
  declarations: [LeavePlanComponent, LeavetypeComponent, LeavehistoryComponent, LeaveComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    LeaveRoutingModule,
    FormsModule,
    NbCheckboxModule,
    NbDatepickerModule,
    ThemeModule

  ],
  providers: [
    LeaveEntitlementServiceProxy,
    LeaveplaneEventServiceProxy,
    FetchLeavePlanServiceProxy,
    PostServiceProxy ]
})
export class LeaveModule { }
