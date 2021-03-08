import { Component, OnInit } from '@angular/core';
import { ColumnTypes, TableColumn } from 'app/components/tablecomponent/models';
import { MainBaseComponent } from 'app/components/main-base/main-base.component';


enum TABS {PENDING,REVIEWED,};
enum TOP_ACTIONS {};



@Component({
  selector: 'ngx-appraisal',
  templateUrl: './appraisal.component.html',
  styleUrls: ['./appraisal.component.scss']
})
export class AppraisalComponent extends MainBaseComponent {
  topActionButtons = [
 ]
TOP_ACTIONS = TOP_ACTIONS
TABS = TABS
selectedTab = TABS.PENDING
tableColumns = [
                {name: 'date', title: 'Name'},
{name: 'date', title: 'ID'},
{name: 'date', title: 'Department'},
{name: 'date', title: 'Cycle'},
{name: 'date', title: 'Assigned KRA'},
{name: 'date', title: 'Employee Status'},
{name: 'date', title: 'Reviewer Status'}
            ]
}
