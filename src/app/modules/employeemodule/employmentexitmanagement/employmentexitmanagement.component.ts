import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExitRequestService, MyExitRequestFilter } from '../services/exit-request.service';
import { TableAction, TableActionEvent } from 'app/components/tablecomponent/models';
import { throwIfAlreadyLoaded } from 'app/@core/module-import-guard';


enum TOP_ACTIONS {
  APPLY_FOR_LEAVE,
  INITIATE_VOLUNTARY_EXIT
}

enum TABLE_ACTION {

  DELETE = '1',
  EDIT = '2'
}

@Component({
  selector: 'ngx-employmentexitmanagement',
  templateUrl: './employmentexitmanagement.component.html',
  styleUrls: ['./employmentexitmanagement.component.scss']
})
export class EmploymentexitmanagementComponent implements OnInit {
ExitManagement: string = 'Exit Management';

  topActionButtons = [

    {name: TOP_ACTIONS.INITIATE_VOLUNTARY_EXIT, label: 'Initiate Voluntary Exit', 'icon': 'plus', outline: false},
  ];

  tableActions: TableAction[] = [
  
    {name: TABLE_ACTION.EDIT, label: 'Edit'},
    {name: TABLE_ACTION.DELETE, label: 'Delete'},
  ]

  tableColumns = [
    { name: 'id', title: 'id' },
    { name: 'b', title: 'Full Name' },
    { name: 'c', title: 'Date Requested' },
    { name: 'd', title: 'End Date' },
    { name: 'e', title: 'Type' },
    { name: 'f', title: 'Status' },
  ];
  
  data = [];
  filter: MyExitRequestFilter = {}

  constructor(
    private router: Router,
    private api: ExitRequestService,
  ) { }

  async ngOnInit() {
    const res = await this.api.list(this.filter).toPromise()
    this.data = res.data
  }

  

  modal(buttion) {
    // if// (buttion === TOP_ACTIONS.APPLY_FOR_LEAVE) {
    //  this.showAddPlanModal = true;
  //  }
    if (buttion === TOP_ACTIONS.INITIATE_VOLUNTARY_EXIT) {
     this.router.navigateByUrl('/employeemodule/exitform');
    }
  }

  async loadData(){
    const res = await this.api.list(this.filter).toPromise()
    this.data = res.data
  }

  tableActionClicked(event: TableActionEvent){
    if(event.name== TABLE_ACTION.DELETE){
      this.api.delete(event.data.id).toPromise();
    }
  }
}
