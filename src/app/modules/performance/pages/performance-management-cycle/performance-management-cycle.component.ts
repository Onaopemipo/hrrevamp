import { Component, OnInit } from '@angular/core';
import { ColumnTypes, TableColumn } from 'app/components/tablecomponent/models';
import { MainBaseComponent } from 'app/components/main-base/main-base.component';


enum TOP_ACTIONS {ADD__NEW__CYCLE,};



@Component({
  selector: 'ngx-performance-management-cycle',
  templateUrl: './performance-management-cycle.component.html',
  styleUrls: ['./performance-management-cycle.component.scss']
})
export class PerformanceManagementCycleComponent extends MainBaseComponent {
  topActionButtons = [
 {name: 'ADD__NEW__CYCLE', label: 'Add New Cycle', icon: 'plus', outline: false},
]
TOP_ACTIONS = TOP_ACTIONS
tableColumns = [
                {name: 'date', title: 'Cycle Name'},
{name: 'date', title: 'Date (From)'},
{name: 'date', title: 'Date (TO)'},
{name: 'date', title: 'Period'},
{name: 'date', title: 'Time'},
{name: 'date', title: 'Rating'},
{name: 'date', title: 'Status'}
            ]
}
