import { Component, OnInit } from '@angular/core';
import { ColumnTypes, TableColumn } from 'app/components/tablecomponent/models';
import { MainBaseComponent } from 'app/components/main-base/main-base.component';
import { Router } from '@angular/router';


enum TABS { NOT__COMPLETED, COMPLETED, }
enum TOP_ACTIONS { }



@Component({
  selector: 'ngx-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.scss']
})
export class ManageEmployeeComponent extends MainBaseComponent {
  topActionButtons = [
  ];
  TOP_ACTIONS = TOP_ACTIONS;
  TABS = TABS;
  selectedTab = TABS.NOT__COMPLETED;
  tableColumns = [
    { name: 'date', title: 'ID' },
    { name: 'date', title: 'Name' },
    { name: 'date', title: 'Position' },
    { name: 'date', title: 'Job Type' }
  ];

  constructor(private route: Router){
    super()
  }


back(){
  this.route.navigateByUrl('/benefits')
}
}
