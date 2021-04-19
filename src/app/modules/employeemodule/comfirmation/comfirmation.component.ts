import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetConfirmationsByDetailsServiceProxy, VwConfirmationDTOIListApiResult, VwConfirmationDTO, FetchEmployeeByIdServiceProxy } from '../../../_services/service-proxies';
import { TableAction, TableActionEvent } from 'app/components/tablecomponent/models';
enum TABLE_ACTION {
  VIEW = '1',

}
@Component({
  selector: 'ngx-comfirmation',
  templateUrl: './comfirmation.component.html',
  styleUrls: ['./comfirmation.component.scss']
})
export class ComfirmationComponent implements OnInit {

  loading: boolean = false
  totalItems = 0;
  currentPage = 1;
  tableColumns = [
    { name: 'employee_name', title: 'EMPLOYEE' },
    { name: 'staff_no', title: 'STAFF NO' },
    { name: 'effective_date', title: 'APPOINTMENT DATE' },
    { name: 'probation_period', title: 'PROBATION PERIOD' },
    { name: 'request_by', title: 'REQUESTED BY' },
    { name: 'log_status', title: 'REQUESTED STATUS' },
  ];


  comfirmationData: VwConfirmationDTO[] = [];
  AllPending: VwConfirmationDTO[] = [];
  Approved: VwConfirmationDTO[] = [];
  Declined: VwConfirmationDTO[] = [];
  filter = {
    id: undefined,
    startDate: null,
    endDate: null,
    log_status: undefined,
    _PageSize: undefined
}

  constructor(private ConfirmationService: GetConfirmationsByDetailsServiceProxy,
    private route: Router,
    private singleEmployee: FetchEmployeeByIdServiceProxy) { }
get   showEmpty(){
  return this.comfirmationData.length === 0;
}
  ngOnInit(): void {
    this.getConfirmationDetails();

  }
  filterUpdated(filter: any) {
    this.filter = { ...this.filter, ...filter };
    this.getConfirmationDetails();
  }
  tableActions: TableAction[] = [
    { name: TABLE_ACTION.VIEW, label: 'View' },
  ]
  getConfirmationDetails() {
    this.loading == true
    this.ConfirmationService.getConfirmationsByDetails(this.filter.startDate,
      this.filter.endDate, this.filter.log_status, this.filter.id, this.filter._PageSize)
      .toPromise().then(data => {
        this.comfirmationData = data.result
        this.loading == false
      })

  }
  setFilterStatus(statusId) {
    this.filter.log_status = statusId;
    this.getConfirmationDetails();
  }
  setStatus(status) {
    this.filter.log_status == status;
    this.getConfirmationDetails()
  }
  setStatusApproved(statusApproved) {
    this.filter.log_status == statusApproved;
    this.getConfirmationDetails()
  }

  setStatusDeclined(statusDeclined) {
    this.filter.log_status == statusDeclined;
    this.getConfirmationDetails()

  }

  tableActionClicked(event: TableActionEvent) {
    if (event.name == TABLE_ACTION.VIEW) {
      this.route.navigate(['/employeemodule/confirmation/employeeview'],{queryParams:{data:JSON.stringify(event.data)}} )
    }

  }
}

// // getConfirmationsByDetail() {
// //   this.ConfirmationService.getConfirmationsByDetails(this.startDate, this.endDate, this.log_status = 2, this._PageSize)
// //     .toPromise().then(comfirmationData => {
// //       this.Approved = comfirmationData.result
// //     })
// // }

// // getConfirmationsByDetailss() {
// //   this.ConfirmationService.getConfirmationsByDetails(this.startDate, this.endDate, this.log_status = 3, this._PageSize)
// //     .toPromise().then(comfirmationData => {
// //       this.Declined = comfirmationData.result
// //     })
// }
// modal(confirmation) {
//   if (confirmation) {
//     // this.route.navigateByUrl('/employeemodule/comfirmation')
//   }
// }
// }
