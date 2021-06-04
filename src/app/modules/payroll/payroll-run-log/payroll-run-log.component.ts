import { Component, OnInit } from '@angular/core';
import { CommonServiceProxy, FetchPayrollServiceProxy, IDTextViewModel, PayrollRun } from 'app/_services/service-proxies';

@Component({
  selector: 'ngx-payroll-run-log',
  templateUrl: './payroll-run-log.component.html',
  styleUrls: ['./payroll-run-log.component.scss']
})
export class PayrollRunLogComponent implements OnInit {
  pageName = "Payroll Run Log";
  PayrollRunList: PayrollRun[] = [];
  loading = false;
  payrollTypeList: IDTextViewModel[] = [];
  constructor(private FetchPayrollService: FetchPayrollServiceProxy,private commonService: CommonServiceProxy) { }
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
  getPayrolltypeName(id) {
    var chk:any = "";
    if (this.payrollTypeList.length > 0) {
      chk = this.payrollTypeList.find(x => x.id == id);
    }
    return chk.text;
  }
  async getPayrolltypes() {
    var data = await this.commonService.getPayrollTypes().toPromise();
    if (!data.hasError) {
      this.payrollTypeList = data.result;
    }
}
  ngOnInit(): void {
    this.getPayrolltypes();
    this.getPayrollRunLog();
    
  }

}
