import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnTypes } from '../../../components/tablecomponent/models';
import { GetPayslipAnalysisServiceProxy } from '../../../_services/service-proxies';

@Component({
  selector: 'ngx-payslipanalysis',
  templateUrl: './payslipanalysis.component.html',
  styleUrls: ['./payslipanalysis.component.scss']
})
export class PayslipanalysisComponent implements OnInit {
  pageName = "Payslip Analysis";
  paySlipdata = [];
  loading = false;
  tableColumns = [
    { name: 'employeeName', title: 'NAME', type: ColumnTypes.Text },
    { name: 'employeeContractId', title: 'EMPLOYEE CONTRACT ID', type: ColumnTypes.Text },
    { name: 'assignmentNo', title: 'ASSIGNMENT NO', type: ColumnTypes.Text },   
    { name: 'totalCurrentEarning', title: 'TOTAL CURRENT EARNING', type: ColumnTypes.Number },
    { name: 'totalPreviousEarning', title: 'TOTAL PREVIOUS EARNING', type: ColumnTypes.Number },
    { name: 'percentageDiff', title: 'PERCENTAGE EARNING DIFF', type: ColumnTypes.Number },
    { name: 'totalCurrentDeduction', title: 'TOTAL CURRENT DEDUCTION', type: ColumnTypes.Number },   
  ];
  totalItems = 0;
  currentPage = 1;
  payRunId = 0;
  filter = {}
  constructor(private activatedroute: ActivatedRoute, private router: Router,
    private GetPayslipAnalysisService: GetPayslipAnalysisServiceProxy) { }
  
  filterUpdated(filter: any) {
  this.filter = { ...this.filter, ...filter };
  this.getPaySlipAnalysis();
}
get showEmpty() {
  return this.paySlipdata.length === 0;
}

  goback() {
    this.router.navigate(['/payroll/runlog'])
  }

  async getPaySlipAnalysis() {
    this.loading = true;
    var slipdata = await this.GetPayslipAnalysisService.getPayslipAnalysis(this.payRunId).toPromise();
    if (!slipdata.hasError) {
      this.loading = false;
      this.paySlipdata = slipdata.result;
    } else {
      this.loading = false;
    }
  }
  ngOnInit(): void {
    console.log("am here");
    this.activatedroute.queryParams.subscribe(async data => {
      console.log(data)
      if (data.id) {
        this.payRunId = data.id
        this.getPaySlipAnalysis();
      }
    })
  }

}
