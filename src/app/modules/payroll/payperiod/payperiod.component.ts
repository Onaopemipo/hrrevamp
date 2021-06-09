import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IStatus, MyColor } from 'app/components/status/models';
import { ACTIONS, ColumnTypes, TableAction, TableActionEvent } from 'app/components/tablecomponent/models';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { ManagePayPeriodDTO, PayPeriodDTO, PayPeriodServiceProxy } from 'app/_services/service-proxies';

export class PayperiodWithStatus extends PayPeriodDTO implements IStatus {
  payPeriod: PayPeriodDTO;

  constructor(payPeriod: PayPeriodDTO) {
    super(payPeriod);
    this.payPeriod = payPeriod;
  }

  getStatusLabel() {
    if (this.payPeriod.is_active) return 'Active';
    if (!this.payPeriod.is_active) return 'In-Active';

  }
  getStatusColor() {
    if (this.payPeriod.is_active) return new MyColor(0, 153, 74);
    if (!this.payPeriod.is_active) return new MyColor(242, 0, 74);
    return new MyColor(253, 238, 238);
  }
}

@Component({
  selector: 'ngx-payperiod',
  templateUrl: './payperiod.component.html',
  styleUrls: ['./payperiod.component.scss']
})
export class PayperiodComponent implements OnInit {
  pageName = "Pay Period";
  topActionButtons = [
    { name: 'add_leave_year', label: 'Add Pay Period', 'icon': 'plus', outline: false },
  ];
  tableColumns = [
    { name: 'name', title: 'Pay Period Name', type: ColumnTypes.Text },
    { name: 'startDate', title: 'Start Date', type: ColumnTypes.Date },
    { name: 'endDate', title: 'End Date', type: ColumnTypes.Date },
    { name: 'is_active', title: 'Status', type: ColumnTypes.Status },
  ];
  tableActions: TableAction[] = [
    { name: ACTIONS.EDIT, label: 'Edit' },
    { name: ACTIONS.DELETE, label: 'Delete' },
  ];
  
  filter = {
    StartDate: null,
    EndDate: null,
    pageSize: 20,
    pageNumber: 1
  }
  totalItems = 0;
  currentPage = 1;
  loading: boolean = false;
  modificationStatus: boolean = false;
  allPayPeriod = [];
  newPayPeriodForm: FormGroup;
  showPayPeriodModal = false;
  newPayPeriod = new ManagePayPeriodDTO().clone();
  submitbtnPressed: boolean = false;
  constructor(private alertservice: AlertserviceService, private PayPeriodService: PayPeriodServiceProxy) { }
  get validateStartdate() {
    if (this.newPayPeriod.startDate) return true;
    return false;
  }
  get validateEnddate() {
    if (this.newPayPeriod.endDate) return true;
    return false;
  }
  get formvalidate() {

    if (this.newPayPeriod.name && this.newPayPeriod.startDate && this.newPayPeriod.endDate) return true;
    return false;
  }
  tableActionClicked(event: TableActionEvent) {
    if (event.name == "1") {
      this.newPayPeriod = event.data;
      this.showPayPeriodModal = true;
      this.modificationStatus = true;
    }
    if (event.name == "2") {
      this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.CONFIRM, event.data.yearName, 'Yes').subscribe(data => {
        if (data == "closed") {
          this.deletePayPeriod(event.data.id);
        }

      })
    }
  }
  filterUpdated(filter: any) {
    this.filter = { ...this.filter, ...filter };
    this.getAllPayperiod();
  }
  get showEmpty() {
    return this.allPayPeriod.length === 0;
  }
  modal(buttion) {
    if (buttion === 'add_leave_year') {
      this.showPayPeriodModal = true;
      this.modificationStatus = false;
    }
  }

  addUpdatePayPeriod() {
    this.submitbtnPressed = true;
    this.loading = true;
    this.PayPeriodService.addUpdatePayPeriod(this.newPayPeriod).subscribe(data => {
      this.submitbtnPressed = false;
      this.loading = false;
      if (!data.hasError) {
        this.getAllPayperiod();
        this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.SUCCESS, data.message, "OK");
        this.newPayPeriod = new ManagePayPeriodDTO().clone();
        this.showPayPeriodModal = false;
        this.modificationStatus = false;
      } else {
        this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.FAILED,data.message,"OK")
      }
    })
  }
  deletePayPeriod(id) {
    this.loading = true;
    this.PayPeriodService.deletePayPeriod(id).subscribe(data => {
      this.loading = false;
      if (!data.hasError) {
        this.getAllPayperiod();
        this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.SUCCESS, data.message, "OK");
      } else {
        this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.FAILED,data.message,"OK")
      }
    })
}
  getAllPayperiod() {
    this.loading = true;
    this.PayPeriodService.getAllPayPeriods(this.filter.pageSize,this.filter.pageNumber,this.filter.StartDate,this.filter.EndDate).subscribe(data => {
      this.loading = false;
      if (!data.hasError) {
        this.allPayPeriod = data.result.map(x=> new PayperiodWithStatus(x));
      } 
    })
  }
  getPayPeriodDetails(id) {
    this.loading = true;
    this.PayPeriodService.getPayPeriod(id).subscribe(data => {
      this.loading = false;
      if (!data.hasError) {
        this.newPayPeriod = data.result;
      } 
    })
  }
  ngOnInit(): void {
    this.getAllPayperiod();
  }

}
