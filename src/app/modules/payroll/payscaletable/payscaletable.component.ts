import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnTypes, TableAction, TableActionEvent } from 'app/components/tablecomponent/models';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { DeletePayScaleServiceProxy, GetAllPayrollTypesServiceProxy, PayrollTypeDTO } from 'app/_services/service-proxies';


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
    { name: 'name', title: 'NAME' },
    { name: 'frequencyRule', title: 'Frequency' },
    { name: 'firstPeriodEndDate', title: 'Period',type: ColumnTypes.Date },
    { name: 'effectiveDate', title: 'Effective Date',type: ColumnTypes.Date }, 
  ];
  tableActions: TableAction[] = [
    {name: TABLE_ACTION.EDIT, label: 'Edit'},
    {name: TABLE_ACTION.DELETE, label: 'Delete'},
  ]
  
  loadingPayScale = false;
  totalItems = 0;
  currentPage = 1;
  filter = {
    pageSize: 10,
    pageNumber: 1,
    frequencyRuleId: undefined
  }
  PayTypedata: PayrollTypeDTO[] = [];
  constructor(private router: Router, private GetAllPayrollTypesService: GetAllPayrollTypesServiceProxy,
    private DeletePayScaleService: DeletePayScaleServiceProxy,
    private alertService: AlertserviceService) { }
  get showEmpty() {
    return this.PayTypedata.length === 0;
  }
  async getPayScale() {
    this.loadingPayScale = true;
  var data = await this.GetAllPayrollTypesService.getAllPayrollTypes(this.filter.pageSize, this.filter.pageNumber, this.filter.frequencyRuleId).toPromise();
    if (!data.hasError) {
      this.loadingPayScale = false;
      this.PayTypedata = data.result;
    } else {
      this.loadingPayScale = false;
  }
  }
  ngOnInit(): void {
    this.getPayScale();
  }
  modal(event) {
    if (event == 0) {
      this.router.navigate(['/payroll/payscalesetup']);
    }

  }
  deletePayType(id) {
    this.loadingPayScale = true;
    this.DeletePayScaleService.deletePayScale(id).subscribe(data => {
      this.loadingPayScale = false;
      if (!data.hasError) {
        this.getPayScale();
        this.alertService.openModalAlert(this.alertService.ALERT_TYPES.SUCCESS, data.message, "ok");
      } else {
        this.alertService.openModalAlert(this.alertService.ALERT_TYPES.FAILED, data.message, "ok");
  }
})
}
  tableActionClicked(event:TableActionEvent){
    if (event.name == TABLE_ACTION.DELETE) {
      console.log('am here')
      this.alertService.openModalAlert(this.alertService.ALERT_TYPES.CONFIRM, event.data.name, 'Yes').subscribe(data => {
        if (data == "closed") {
          this.deletePayType(event.data.id);
        }

      })
}
    if(event.name == TABLE_ACTION.EDIT){
      this.router.navigate(['/payroll/payscalesetup'],{queryParams:{id:event.data.id}})
    }
  }
  
}
