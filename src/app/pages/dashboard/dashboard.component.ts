import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NbThemeService } from '@nebular/theme';



const no_of_ms_in_a_day = 24 * 60 * 60 * 1000;


@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  show_modal = false;
  single = [
    {
      name: 'Germany',
      value: 8940000,
    },
    {
      name: 'USA',
      value: 5000000,
    },
    {
      name: 'France',
      value: 7200000,
    },
    {
      name: 'Canada',
      value: 820000,
    },
    {
      name: 'Nigeria',
      value: 7300000,
    },
  ];
  colorScheme: any;
  barcolorScheme: any;
  themeSubscription: any;
  options: any = {};



  multi: any[];

  

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Location';
  showYAxisLabel = true;
  yAxisLabel = 'Employee Count';
  showGridLines = true;

  //barChat
  barPadding = 60;
  view: any[] = [600, 300];


  //for doughnot
  doughnut = true;
  showLabels = true;
  explodeSlices = false;
  doughView = [700, 280]


  //Events
  weekdays: Date[] = [];
  today = new Date();
  days_of_week = [
    'Mon', 'Tue', 'Wed', 'Thur', 'Fri'
  ];
 
  constructor(private theme: NbThemeService) { 
    this.colorScheme = {
      domain: ['#FF90A4', '#2E9CDA', '#2CD8C5', '#E2D136', '#5655CA'],
    };


    this.barcolorScheme = {
      domain: ['#2E9CDA', '#2E9CDA', '#2E9CDA', '#2E9CDA', '#2E9CDA'],
    };
  }

  @ViewChild('pieChart') ctx: ElementRef;
  ngAfterViewInit() {
    this.options = {
      backgroundColor: '#fff',
      color: ['#FF90A4', '#2E9CDA', '#2CD8C5', '#E2D136', '#5655CA'],
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      // legend: {
      //   orient: 'vertical',
      //   left: 'left',
      //   data: ['USA', 'Germany', 'France', 'Canada', 'Russia'],
      //   textStyle: {
      //     color: '#343A40',
      //   },
      // },
      series: [
        {
          name: 'Countries',
          type: 'pie',
          radius: '80%',
          center: ['50%', '50%'],
          data: [
            { value: 335, name: 'Germany' },
            { value: 310, name: 'France' },
            { value: 234, name: 'Canada' },
            { value: 135, name: 'Russia' },
            { value: 1548, name: 'USA' },
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(153, 153, 153, 0.04)',
            },
          },
          label: {
            normal: {
              textStyle: {
                color: '#343A40',
              },
            },
          },
          labelLine: {
            normal: {
              lineStyle: {
                color: '#E9EBF1',
              },
            },
          },
        },
      ],
    };
 
  }
  ngOnInit(): void {
  //Events
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

  openModal() {
    this.show_modal = true;
  }

  closeModal() {
    this.show_modal = false;
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
