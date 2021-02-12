import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import  * as Chart from 'chart.js'

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  pagetitle = 'Dashboard';
  rbutton = [
    { name: 'create_new', label: 'Create New', icon: '', outline: true },
    { name: 'add_new', label: 'Add New', icon: 'plus', outline: false },


  ];
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
  ];
  colorScheme: any;
  barcolorScheme: any;
  themeSubscription: any;
  options: any = {};



  multi: any[];

  view: any[] = [450, 250];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';
showGridLines = true;
barPadding = 130;
  
 
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
 

    var myPieChart = new Chart(this.ctx.nativeElement, {
      type: 'pie',
      data: {
        datasets: [{
          data: [5, 6, 10],
          backgroundColor: ['#2CD8C5', '#2E9CDA', '#FF90A4'],
        }],
        labels: [
            'Red',
            'Yellow',
            'Blue'
        ]
    },
      options: {
        cutoutPercentage: 80
    }
  });
  }
  ngOnInit(): void {
  
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
