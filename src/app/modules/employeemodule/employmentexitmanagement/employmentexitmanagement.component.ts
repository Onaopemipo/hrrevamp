import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExitRequestService, MyExitRequestFilter } from '../services/exit-request.service';
import { TableAction, TableActionEvent } from 'app/components/tablecomponent/models';
import { RetirementServiceProxy, RetirmentDTO } from 'app/_services/service-proxies';
import { AlertserviceService } from 'app/_services/alertservice.service';



enum TOP_ACTIONS {
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
ExitManagement: string = '';
  topActionButtons = [
    {name: TOP_ACTIONS.INITIATE_VOLUNTARY_EXIT, label: '', 'icon': 'plus', outline: false},
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
  

  filter: MyExitRequestFilter = {};
  allExitRequest: RetirmentDTO[] = [];
  totalItems = 0;
  currentPage = 1;
  loading: boolean = false;
  constructor(
    private router: Router,
    private RetirementService: RetirementServiceProxy,
    private alertservice: AlertserviceService,
    private activatedroute: ActivatedRoute
  ) { }
  tableActionClicked(event: TableActionEvent) {
    if (event.name == "1") {

    }
    if (event.name == "2") {
      this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.CONFIRM, event.data.yearName, 'Yes').subscribe(data => {
        if (data == "closed") {
        
        }

      })
    }
  }
  filterUpdated(filter: any) {
    this.filter = { ...this.filter, ...filter };
    this.getAllRetirementRequest();
  }
  get showEmpty() {
    return this.allExitRequest.length === 0;
  }
  getAllRetirementRequest() {
    this.RetirementService.getAllRetire(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)
      .subscribe(data => {
        if (!data.hasError) {
          this.allExitRequest = data.result;
      }
    })
}


  async ngOnInit() {
    this.getAllRetirementRequest();
    this.activatedroute.params.subscribe(data => {
      if (data) {
        if (data.type) {
          let pnam = data.type;
          this.ExitManagement = pnam == 'retirement' ? "Retirement" : "Exit Management"
          this.topActionButtons[0].label = pnam == 'retirement' ? "Initiate Retirement": "Initiate Voluntary Exit" ;
        }
      }
      
      console.log(data)
    })
  }

  

  modal(buttion) {
    console.log(buttion)
    if (buttion === TOP_ACTIONS.INITIATE_VOLUNTARY_EXIT) {
     this.router.navigate(['/employeemodule/exitform'],{queryParams:{type:this.ExitManagement}});
    }
  }


}
