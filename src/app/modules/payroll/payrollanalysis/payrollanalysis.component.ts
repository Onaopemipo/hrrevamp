import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetPayrollAnalysisServiceProxy,RptPayrollRunAnalysis } from 'app/_services/service-proxies';

@Component({
  selector: 'ngx-payrollanalysis',
  templateUrl: './payrollanalysis.component.html',
  styleUrls: ['./payrollanalysis.component.scss']
})
export class PayrollanalysisComponent implements OnInit {
  pageName = "Payroll Analysis";
  payRunId = 0;
  payrollTypeId = 0;
  payRunName = "";
  customizedlineoptions: any = {};
  xAxisData = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC'
  ];
  totalDeauctionData = [];
  totalEarningData = [];
  totalNetPayData = [];
  payRollAnalysisall:RptPayrollRunAnalysis[] = [];
  loading = false;
  constructor(private router: Router, private acitvatedroute: ActivatedRoute,
    private GetPayrollAnalysisService: GetPayrollAnalysisServiceProxy) { }
  goback() {
      this.router.navigate(['/payroll/runlog'])
    }
  getpayrollAnalysis() {

  }
  ngOnInit(): void {

  }
  get showEmpty() {
    return this.loading;
  }
  ngAfterViewInit() {
    this.loading = true;
    this.acitvatedroute.queryParams.subscribe(async data => {

      console.log(data)
      if (data.id && data.typeid) {
        this.payRunId = data.id;
        this.payrollTypeId = data.typeid;
        this.GetPayrollAnalysisService.getPayrollAnalysis(this.payRunId, this.payrollTypeId).subscribe(data => {
          this.loading = false;
          if (!data.hasError) {
            this.payRollAnalysisall = data.result;
            this.xAxisData.forEach(val => {
              this.totalDeauctionData.push(0);
              this.totalEarningData.push(0);
              this.totalNetPayData.push(0);
            });
            this.payRollAnalysisall.forEach(val => {
              let seacrcT = val.payPeriod.substr(0, 3);
              var xIndex = this.xAxisData.findIndex(x => x.toLowerCase() == seacrcT.toLowerCase());
              this.totalDeauctionData[xIndex] = val.totalDeduction;
              this.totalEarningData[xIndex] = val.totalEarning;
              this.totalNetPayData[xIndex] = val.totalNetPayt;
            });
            console.log(this.totalDeauctionData,  this.totalEarningData, this.totalNetPayData)
            this.customizedlineoptions = {
              backgroundColor: echarts.bg,
              color: ['#2F9CDA', '#764F7D','#22bb33'],
              tooltip: {
                trigger: 'axis',
         
              },
              // legend: {
        
              //   data: ['Previous Growth ', 'Current Growth'],
              //   textStyle: {
              //     color: '#343A40',
              //   },
              // },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: [
        
                {
        
                  type: 'category',
                  axisTick: {
                    alignWithLabel: true,
                  },
                  axisLine: {
                    onZero: false,
                    lineStyle: {
                      color: '#343A40',
                    },
                  },
        
                  axisLabel: {
                    textStyle: {
                      color: '#343A40',
                    },
                  },
                  data: this.xAxisData,
                },
        
             
              ],
              yAxis: [
                {
                  type: 'value',
                  axisLine: {
                    lineStyle: {
                      color: '#343A40',
                    },
                  },
                  splitLine: {
                    lineStyle: {
                      color: '#E9EBF1',
                      type: 'dashed'
                    },
                  },
                  axisLabel: {
                    textStyle: {
                      color: '#343A40',
                    },
                  },
                },
        
        
                {
                  type: 'category',
                  axisLine: {
                    onZero: false,
                    lineStyle: {
                      color: '#E9EBF1',
                    },
                  },
                }
              ],
              series: [
                {
                  name: 'Total Deduction',
                  type: 'line',
                  smooth:true,
                  showSymbol: false,
                  data: this.totalDeauctionData
              },
              {
                  name: 'Total Earning',
                  type: 'line',
                  smooth:true,
                  showSymbol: false,
                  data: this.totalEarningData
              },
              {
                  name: 'Total NetPay',
                  type: 'line',
                  smooth:true,
                  showSymbol: false,
                  data: this.totalNetPayData
              },
              ],
            };
          }
        })
      }
 
      if (data.name) {
        this.payRunName = data.name;
        this.pageName += " - " + this.payRunName;
      }
    })

 
   }

}
