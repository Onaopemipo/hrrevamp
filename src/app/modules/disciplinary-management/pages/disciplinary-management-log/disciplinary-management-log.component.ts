import { Component, OnInit } from '@angular/core';
import { ColumnTypes, TableColumn } from 'app/components/tablecomponent/models';
import { MainBaseComponent } from 'app/components/main-base/main-base.component';


enum TOP_ACTIONS { DISCIPLINE, }



@Component({
  selector: 'ngx-disciplinary-management-log',
  templateUrl: './disciplinary-management-log.component.html',
  styleUrls: ['./disciplinary-management-log.component.scss']
})
export class DisciplinaryManagementLogComponent extends MainBaseComponent {
  topActionButtons = [
    { name: 'DISCIPLINE', label: 'Discipline', icon: '', outline: false },
  ];
  TOP_ACTIONS = TOP_ACTIONS;
  tableColumns = [
    { name: 'date', title: 'Recipient' },
    { name: 'date', title: 'Department' },
    { name: 'date', title: 'Subject' },
    { name: 'date', title: 'Discipline Type' },
    { name: 'date', title: 'Date Sent' },
    { name: 'date', title: 'Status' }
  ];
}
