import { AddUpdateHolidayServiceProxy, CreateLeaveByAdminServiceProxy, CreateLeaveYearServiceProxy, DataServiceProxy, DeleteServiceProxy, GetLeaveRequestServiceProxy, GetLeaveTypesServiceProxy, GetLeaveYearServiceProxy, GetLeaveYearsServiceProxy, HolidayDatesServiceProxy } from './../../_services/service-proxies';
import { ThemeModule } from './../../@theme/theme.module';
import { LeaveComponent } from './leave.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'app/components/components.module';
import { LeaveRoutingModule } from './leave.routing.module';
import { LeavePlanComponent } from './leave-plan/leave-plan.component';
import { FormsModule } from '@angular/forms';
import { NbAlertModule, NbCheckboxModule, NbDatepickerModule, NbSelectModule, } from '@nebular/theme';
import { LeavetypeComponent } from './leavetype/leavetype.component';
import { LeavehistoryComponent } from './leavehistory/leavehistory.component';
import { LeaveentitlementsComponent } from './leaveentitlements/leaveentitlements.component';
import { LeaveenholidayComponent } from './leaveholidays/leaveholidays.component';
import {
  LeaveEntitlementServiceProxy,
  LeavePlanEventsServiceProxy,
  FetchLeavePlanServiceProxy,
  PostServiceProxy
} from '../../_services/service-proxies';
import { LeaveyearComponent } from './leaveyear/leaveyear.component';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { DeleteLeaveTypeServiceProxy } from 'app/_services/service-proxies';
@NgModule({
  declarations: [LeavePlanComponent, LeavetypeComponent, LeavehistoryComponent, LeaveComponent,
    LeaveyearComponent, LeaveentitlementsComponent,LeaveenholidayComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    LeaveRoutingModule,
    FormsModule,
    NbCheckboxModule,
    NbDatepickerModule,
    ThemeModule,
    NbSelectModule,
    NbAlertModule

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
    CreateLeaveByAdminServiceProxy,
    DeleteServiceProxy,
    CreateLeaveYearServiceProxy,
    DeleteLeaveTypeServiceProxy,
    DataServiceProxy,
    GetLeaveRequestServiceProxy,
    DeleteServiceProxy,
    AddUpdateHolidayServiceProxy,
    HolidayDatesServiceProxy
    
   ]
})
export class LeaveModule { }
