import { Component, OnInit } from '@angular/core';
import { ColumnTypes, TableColumn } from 'app/components/tablecomponent/models';
import { MainBaseComponent } from 'app/components/main-base/main-base.component';


enum TOP_ACTIONS {};



@Component({
  selector: 'ngx-performance-matrix',
  templateUrl: './performance-matrix.component.html',
  styleUrls: ['./performance-matrix.component.scss']
})
export class PerformanceMatrixComponent extends MainBaseComponent {
  topActionButtons = [
 ]
TOP_ACTIONS = TOP_ACTIONS
tableColumns = [
                {name: 'date', title: 'Name'},
{name: 'date', title: 'ID'},
{name: 'date', title: 'Department'},
{name: 'date', title: 'Unit'},
{name: 'date', title: 'Position'},
{name: 'date', title: 'Cycle'},
{name: 'date', title: 'Assigned Goals'}
            ]
}
