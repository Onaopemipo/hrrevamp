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
  showEmpty: boolean = false
  loading: boolean = false
  totalItems = 0;
  currentPage = 0;
  tableColumns = [
    { name: 'a', title: 'S/N' },
    { name: 'employee_name', title: 'EMPLOYEE' },
    { name: 'staff_no', title: 'STAFF NO' },
    { name: 'effective_date', title: 'APPOINTMENT DATE' },
    { name: 'probation_period', title: 'PROBATION PERIOD' },
    { name: 'request_by', title: 'REQUESTED BY' },
    { name: 'log_status', title: 'REQUESTED STATUS' },
  ];
  id?: number = 0
  startDate?: Date = new Date();
  endDate?: Date = new Date();
  log_status?: number = 0;
  _PageSize?: number = 0;

  data: VwConfirmationDTO[] = [];
  AllPending: VwConfirmationDTO[] = [];
  Approved: VwConfirmationDTO[] = [];
  Declined: VwConfirmationDTO[] = [];


  constructor(private ConfirmationService: GetConfirmationsByDetailsServiceProxy,
    private route: Router,
    private singleEmployee: FetchEmployeeByIdServiceProxy) { }

  ngOnInit(): void {
    this.getConfirmationDetails();

  }

  tableActions: TableAction[] = [
    { name: TABLE_ACTION.VIEW, label: 'View' },
  ]
  getConfirmationDetails() {
    this.loading == true
    this.ConfirmationService.getConfirmationsByDetails(this.startDate, this.endDate, this.log_status, this._PageSize)
      .toPromise().then(comfirmationData => {
        this.data = comfirmationData.result
        this.loading == false
      })

  }
  setFilterStatus(statusId) {
    this.log_status = statusId;
    this.getConfirmationDetails();
  }
  setStatus(status) {
    this.log_status == status;
    this.getConfirmationDetails()
  }
  setStatusApproved(statusApproved) {
    this.log_status == statusApproved;
    this.getConfirmationDetails()
  }

  setStatusDeclined(statusDeclined) {
    this.log_status == statusDeclined;
    this.getConfirmationDetails()

  }

  tableActionClicked(event: TableActionEvent) {
    if (event.name == TABLE_ACTION.VIEW) {
      this.route.navigateByUrl('/employeemodule/confirmation/employeeview/' + event.data.employee_id)
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
