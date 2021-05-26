import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExitRequestService, MyExitRequestFilter } from '../services/exit-request.service';
import { ColumnTypes, TableAction, TableActionEvent } from 'app/components/tablecomponent/models';
import { RetirementServiceProxy, RetirmentDTO } from 'app/_services/service-proxies';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { IStatus, MyColor } from 'app/components/status/models';

export class RetirementWithStatus extends RetirmentDTO implements IStatus {
  retirementClass: RetirmentDTO;

  constructor(retirementClass: RetirmentDTO) {
    super(retirementClass);
    this.retirementClass = retirementClass;

  }
  get status() {
    return this.retirementClass.log_status;
  }
  getStatusLabel() {
    if (this.retirementClass.log_status === 1) return 'Pending';
    if (this.retirementClass.log_status === 2) return 'Approved';
    if (this.retirementClass.log_status === 3) return 'Rejected';

  }
  getStatusColor() {
    if (this.retirementClass.log_status === 1) return new MyColor(242, 153, 74);
    if (this.retirementClass.log_status ===2) return new MyColor(0, 153, 74);
    if (this.retirementClass.log_status === 3) return new MyColor(242, 0, 74);
    return new MyColor(253, 238, 238);
  }
}

enum TOP_ACTIONS {
  INITIATE_VOLUNTARY_EXIT,
  BULK_UPLOAD
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
    { name: TOP_ACTIONS.INITIATE_VOLUNTARY_EXIT, label: '', 'icon': 'plus', outline: false },
    {name: TOP_ACTIONS.BULK_UPLOAD, label: 'Bulk Upload', 'icon': '', outline: true},
  ];

  tableActions: TableAction[] = [  
    {name: TABLE_ACTION.EDIT, label: 'Edit'},
    {name: TABLE_ACTION.DELETE, label: 'Delete'},
  ]

  tableColumns = [
    { name: 'fullName', title: 'Full Name', type: ColumnTypes.Text },
    { name: 'dateSubmitted', title: 'Date Requested',type: ColumnTypes.Date },
    { name: 'effectiveDate', title: 'Effective Date',type: ColumnTypes.Date },
    { name: 'retirementType', title: 'Type',type: ColumnTypes.Text },
    { name: 'log_status', title: 'Status',type: ColumnTypes.Status },
  ];
  
  filter = {
    ID: undefined,
    FullName: undefined,
    EmployeeId: undefined,
    DateRequested: undefined,
    Type: undefined,
    Status: undefined,
    IsCleared: undefined,
    retirmentTypeid: undefined,
    startdate: undefined,
    endate: undefined,
    PageSize: 10,
    PageNumber: 1
  }

  allExitRequest = [];
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
    if (event.name == TABLE_ACTION.EDIT) {
this.router.navigate(['/employeemodule/exitrequest'],{queryParams:{employeeId: event.data.EmployeeId}})
    }
    if (event.name == TABLE_ACTION.DELETE) {
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
    this.loading = true;
    this.RetirementService.getRetirees(this.filter.ID, this.filter.FullName,this.filter.EmployeeId,this.filter.DateRequested,this.filter.Type,this.filter.Status,this.filter.IsCleared,this.filter.retirmentTypeid,this.filter.startdate,this.filter.endate,this.filter.PageSize,this.filter.PageNumber)
      .subscribe(data => {
        this.loading = false;
        if (!data.hasError) {
          var dt = data.result.map(d=>new RetirementWithStatus(d));
          this.allExitRequest = dt;
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

  filterLeavePlan(is_approved = []) {
   
    let tabtittle = "";
    is_approved.forEach(value => {
      if (value.activeValue) tabtittle = value.tabTitle;
    });
    console.log(tabtittle);
     this.filter.Status = tabtittle == 'New Exits'? 1 : (tabtittle == 'Compelled Exit'?2 : 3);
    this.getAllRetirementRequest();
  }
}
