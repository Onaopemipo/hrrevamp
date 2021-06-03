import { Component, OnInit } from '@angular/core';
import { FetchPayrollServiceProxy, PayrollRun } from 'app/_services/service-proxies';

@Component({
  selector: 'ngx-payroll-run-log',
  templateUrl: './payroll-run-log.component.html',
  styleUrls: ['./payroll-run-log.component.scss']
})
export class PayrollRunLogComponent implements OnInit {
  pageName = "Payroll Run Log";
  PayrollRunList: PayrollRun[] = [];
  loading = false;
  constructor(private FetchPayrollService: FetchPayrollServiceProxy) { }
  get showEmpty() {
    return this.PayrollRunList.length === 0;
  }
  getPayrollRunLog() {
    this.loading = true;
    this.FetchPayrollService.fetchPayroll(undefined).subscribe(data => {
      this.loading = false;
      if (!data.hasError) {
        this.PayrollRunList = data.result;
      }
    })  
  }

  ngOnInit(): void {
    this.getPayrollRunLog();
  }

}
