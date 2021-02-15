import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NbThemeService } from '@nebular/theme';



const no_of_ms_in_a_day = 24 * 60 * 60 * 1000;


@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  src: string = 'assets/icons/camera.jpg';
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
  customizePieOption: any = {};
  customizedlineoptions: any = {};
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
  this.customizedlineoptions = {
    backgroundColor: echarts.bg,
    color: ['#2F9CDA', '#764F7D'],
    tooltip: {
      trigger: 'none',
      axisPointer: {
        type: 'cross',
      },
    },
    // legend: {

    //   data: ['Previous Growth ', 'Current Growth'],
    //   textStyle: {
    //     color: '#343A40',
    //   },
    // },
    grid: {
      top: 70,
      bottom: 50,
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
        axisPointer: {
          label: {
            formatter: params => {
              return (
                'Current Growth  ' + params.value + (params.seriesData.length ? '：' + params.seriesData[0].data : '')
              );
            },
          },
        },
        data: [
          '2010',
          '2011',
          '2012',
          '2013',
          '2014',
          '2015',
          '2016',
          '2017',
          '2018',
      
        ],
      },
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true,
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: '#E9EBF1',
          },
        },
     
        axisLabel: {
          textStyle: {
            color: '#343A40',
          },
        },
        axisPointer: {
          label: {
            formatter: params => {
              return (
                'Previous Growth  ' + params.value + (params.seriesData.length ? '：' + params.seriesData[0].data : '')
              );
            },
          },
        },
        // data: [
        //   '2015-1',
        //   '2015-2',
        //   '2015-3',
        //   '2015-4',
        //   '2015-5',
        //   '2015-6',
        //   '2015-7',
        //   '2015-8',
        //   '2015-9',
        //   '2015-10',
        //   '2015-11',
        //   '2015-12',
        // ],
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
        name: 'Previous Growth',
        type: 'line',
        xAxisIndex: 1,
        smooth: true,
        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7],
        showSymbol: false,
  
      },
      {
        name: 'Current Growth',
        type: 'line',
        smooth: true,
        data: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4],
        showSymbol: false,
    
      },
    ],
  };
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
