import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-employeeonboardingdashboard',
  templateUrl: './employeeonboardingdashboard.component.html',
  styleUrls: ['./employeeonboardingdashboard.component.scss']
})
export class EmployeeonboardingdashboardComponent implements OnInit {
  title: string = 'Employee Onboarding';
  customizePieOption: any = {};
  lineOption: any = {};

  rbutton = [
    { name: 'bulk_upload', label: 'Bulk Upload', icon: '', outline: true },
    { name: 'new_employee', label: 'New Employee', icon: 'plus', outline: false },

  ];
  constructor(private router: Router) { }
  ngAfterViewInit() {
    this.customizePieOption = {
      color: [
'#5655CA',
'#E2D136',
'#2E9CDA',
'#2CD9C5',
      ],
      legend: {
          top: 'bottom'
      },
      toolbox: {
          show: true,
          feature: {
              mark: {show: true},
              dataView: {show: false, readOnly: false},
              restore: {show: false},
              saveAsImage: {show: false}
          }
      },
      series: [
          {
              name: 'Customized Pie',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              roseType: 'radius',
              itemStyle: {
                  borderRadius: 8
              },
              data: [
                  {value: 50, name: 'Admin'},
                  {value: 40, name: 'Finance'},
                  {value: 32, name: 'HR'},
                  {value: 28, name: 'Engineering'},

              ]
          }
      ]
    };

    this.lineOption = {
      color: ['#4847E0'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        },
    },
      xAxis: {
        type: 'category',
        splitLine: {
          show: true
      },
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: true
        },
        axisLabel: {
          formatter: '{value}'
      },
      axisPointer: {
          snap: true
      }
      },
      series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320, 350, 500, 1500, 2000, 1000],
          type: 'line',
        smooth: true,
        showSymbol: false,
      }]
  };
  }

  pageActionClicked(page) {
    if (page == 'new_employee') {
   this.router.navigate(['/employeemodule/employeeonboarding']);
    }
    if (page == 'bulk_upload') {
    //  this.bulkuploadServices.openbulkUploadModal();

       }
  }
  getuploadedfiles(event) {
    console.log(event);
  }

  ngOnInit(): void {
  }

}
