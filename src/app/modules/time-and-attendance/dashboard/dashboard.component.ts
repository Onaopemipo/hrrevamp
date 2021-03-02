import { Component, OnInit } from '@angular/core';

const no_of_ms_in_a_day = 24 * 60 * 60 * 1000;

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  title: string = 'Time and Attendance';
  rbutton = [
    { name: 'create_shift', label: 'Create Shift', icon: '', outline: true },
    { name: 'create_project', label: 'Create Project', icon: '', outline: false },
    
  ];
  barcolorScheme: any;
  lineoptions: any = {};
   // Events
   weekdays: Date[] = [];
   today = new Date();
   days_of_week = [
     'Mon', 'Tue', 'Wed', 'Thur', 'Fri'
  ];
  
  constructor() { }

  ngOnInit(): void {
      // Events
  const today = this.today;
  const day_of_week = today.getDay();
  const start_of_week = Number(today) - day_of_week * no_of_ms_in_a_day;
  const days = [];
  for (let day_no = 1; day_no <= 5; day_no++) {
    const day_in_ms = start_of_week + day_no * no_of_ms_in_a_day;
    const day = new Date(day_in_ms);
    days.push(day);
  }
  this.weekdays = days;
  }
  ngAfterViewInit() { 
    this.lineoptions = {
      color: ['#9594F8', '#4847E0'],
      tooltip: {
        trigger: 'none',
        axisPointer: {
          type: 'cross',
        },
      },
      xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug','Sep','Oct','Nov', 'Dec']
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: [420, 932, 901, 934, 1290, 1330, 1320,300,500,400,800, 500],
        type: 'line',
        smooth: true,
        areaStyle: {},
        showSymbol: false,
      }]
  };
  }
}
