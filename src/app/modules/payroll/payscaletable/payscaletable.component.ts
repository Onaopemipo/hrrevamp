import { Component, OnInit } from '@angular/core';
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
  selector: 'ngx-payscaletable',
  templateUrl: './payscaletable.component.html',
  styleUrls: ['./payscaletable.component.scss']
})
export class PayscaletableComponent implements OnInit {
  topActionButtons = [
    {name: TOP_ACTIONS.APPLY_FOR_LEAVE, label: 'Add New Pay Scale', 'icon': 'plus', outline: false},

  ];

  showdeleteModal : boolean = false

  tableColumns = [
    { name: 'a', title: 'NAME' },
    { name: 'b', title: 'INDUSTRY' },
    { name: 'c', title: 'ACCOUNT NAME' },
    { name: 'd', title: 'ACCOUNT NUMBER' },
    { name: 'e', title: 'BANK' },
   
  ];
  tableActions: TableAction[] = [
    {name: TABLE_ACTION.VIEW, label: 'View'},
    {name: TABLE_ACTION.EDIT, label: 'Edit'},
    {name: TABLE_ACTION.DELETE, label: 'Delete'},
  ]
  data=[{

  }]
  constructor() { }

  ngOnInit(): void {
  }
  modal(event) {

  }

  tableActionClicked(event:TableActionEvent){
    if(event.name == TABLE_ACTION.DELETE){
      this.showdeleteModal = true
    }
  }
  
}
