import { TableColumn } from './../../../components/tablecomponent/models';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { EmployeesService, MyEmployeeDatail, } from '../services/employees.service';
import { TableAction, TableActionEvent } from 'app/components/tablecomponent/models';
import { Router } from '@angular/router';


enum TOP_ACTIONS {
  ADD_MORE,
  INITIATE_VOLUNTARY_EXIT
}
enum TABLE_ACTION {
  VIEW = '1',
  EDIT = '3'
}


@Component({
  selector: 'ngx-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit {

  successionTable: TableColumn [] = [
    {name: 'position_name', title: 'position'},
    {name: ' employee_name', title: 'Employee'},
    {name: 'department_name', title: 'Department'},
    {name: 'unit_name', title: 'Unit'},
    {name: ' level', title: 'Level'},
   
  ];
   
  loading = false;

  // id: number;
  // position_name: string;
  // employee_name: string;
  // department_name: string;
  // unit_name: string;
  // level: number;
  // location_name: string;
  // picture: string;

 data: MyEmployeeDatail[] = []
  
  // tableColumn =[
  //   { name: 'Name', title: 'NAME' },
  //   { name: 'PaymentType', title: 'PAYMENT TYPE' },
  //   { name: 'ElementName', title: 'ELEMENT NAME' },
  //   { name: 'ElementCategory', title: 'ELEMENT CATEGORY' },
  //   { name: 'ElementType', title: 'ELEMENT TYPE' },
  //   { name: 'e', title: 'ELEMENT TYPE' },
  //   { name: 'f', title: 'AMOUNT' },
  //   { name: 'g', title: 'INSTITUTION' },
  // ];
   
  topActionButtons = [
    {name: TOP_ACTIONS.ADD_MORE, label: 'Add More', 'icon': 'plus', outline: false},

  ];
  newPlan: boolean = false;

  constructor(
    private navCtrl: Location,
    private api: EmployeesService,
    private router:Router
  ) { }
  
  tableActionClicked(event: TableActionEvent){
    // if(event.name==TABLE_ACTION.DELETE){
    //   this.showdeleteModal = true
    //   }
    //   if(event.name==TABLE_ACTION.EDIT){
    //     this.router.navigateByUrl('/payroll/editpayment')
    //   }
     if(event.name==TABLE_ACTION.VIEW){
      this.router.navigateByUrl('/career-succession/profiledetails/' + event.data.id)
       }
  }
 tableActions: TableAction[] = [
  {name: TABLE_ACTION.VIEW, label: 'View'},
  {name: TABLE_ACTION.EDIT, label: 'Edit'},

]
 ngOnInit(): void {
    this.loading = true;
    this.api.list({}).toPromise().then(response => {
      [...this.data ]= response.data;
      this.loading = false;
    });
  }

  goback() {
    this.navCtrl.back();
  }
  addPlan(){
    this.newPlan = !this.newPlan;
  }

}