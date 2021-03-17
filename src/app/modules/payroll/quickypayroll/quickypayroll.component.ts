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
  selector: 'ngx-quickypayroll',
  templateUrl: './quickypayroll.component.html',
  styleUrls: ['./quickypayroll.component.scss']
})
export class QuickypayrollComponent implements OnInit {

  showViewModal: boolean = false

  tableColumns = [
    { name: 'a', title: 'NAME' },
    { name: 'b', title: 'ID' },
    { name: 'c', title: 'SALARY SCALE' },
    { name: 'd', title: 'TOTAL EARNING' },
    { name: 'd', title: 'TOTAL DEDUCTION' },
    { name: 'd', title: 'NET PAY' },
    { name: 'd', title: 'HOURS WORKED' },
    { name: 'd', title: 'OFF PAYROLL' },
  ]
  topActionButtons = [

  ]

  tableActions: TableAction[] = [
    { name: TABLE_ACTION.VIEW, label: 'View' },
    { name: TABLE_ACTION.EDIT, label: 'Edit' },
    { name: TABLE_ACTION.DELETE, label: 'Delete' },
  ]
  data = [{

  }]
  constructor() { }

  ngOnInit(): void {
  }
  modal(event) {

  }

  tableActionClicked(event: TableActionEvent) {
    if (event.name == TABLE_ACTION.VIEW) {
      this.showViewModal = true
    }
  }
}



