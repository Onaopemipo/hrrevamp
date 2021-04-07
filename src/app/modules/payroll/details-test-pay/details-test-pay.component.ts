import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-details-test-pay',
  templateUrl: './details-test-pay.component.html',
  styleUrls: ['./details-test-pay.component.scss']
})
export class DetailsTestPayComponent implements OnInit {
  tableColumns = [
    { name: 'a', title: 'EMPLOYEE' },
    { name: 'b', title: 'ASSIGNMENT NO' },
    { name: 'c', title: 'EARNINGS' },
    { name: 'd', title: 'DEDUCTION' },
    { name: 'e', title: 'NETPAY' },
    
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
