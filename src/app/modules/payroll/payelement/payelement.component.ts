import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableAction, TableActionEvent } from 'app/components/tablecomponent/models';


enum TOP_ACTIONS {
  APPLY_FOR_LEAVE,
  INITIATE_VOLUNTARY_EXIT
}
enum TABLE_ACTION {
  VIEW = '1',
  DELETE = '2',
  EDIT = '3'
}

@Component({
  selector: 'ngx-payelement',
  templateUrl: './payelement.component.html',
  styleUrls: ['./payelement.component.scss']
})
export class PayelementComponent implements OnInit {

  topActionButtons = [
    {name: TOP_ACTIONS.APPLY_FOR_LEAVE, label: 'Add Payroll Item', 'icon': 'plus', outline: false},

  ];

  tableColumns = [
    { name: 'a', title: 'NAME' },
    { name: 'b', title: 'PAYMENT TYPE' },
    { name: 'c', title: 'ELEMENT NAME' },
    { name: 'd', title: 'ELEMENT CATEGORY' },
    { name: 'e', title: 'ELEMENT TYPE' },
    { name: 'e', title: 'ELEMENT TYPE' },
    { name: 'f', title: 'AMOUNT' },
    { name: 'g', title: 'INSTITUTION' },
  ];

  tableActions: TableAction[] = [
    {name: TABLE_ACTION.VIEW, label: 'View'},
    {name: TABLE_ACTION.EDIT, label: 'Edit'},
    {name: TABLE_ACTION.DELETE, label: 'Delete'},
  ]
  data = [{}]
  showViewModal : boolean = false
  showdeleteModal = false
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  tableActionClicked(event: TableActionEvent){
    if(event.name==TABLE_ACTION.DELETE){
      this.showdeleteModal = true
      }
      if(event.name==TABLE_ACTION.EDIT){
        this.router.navigateByUrl('/payroll/editpayment')
      }
      if(event.name==TABLE_ACTION.VIEW){
        this.showViewModal = true
      }
  }


  modal(button){
 
  }
}
