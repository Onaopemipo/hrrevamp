import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent implements OnInit {
  tableColumns = [
    { name: 'a', title: 'S/N' },
    { name: 'b', title: 'EMPLOYEE' },
    { name: 'c', title: 'PREVIOUS ROLE' },
    { name: 'd', title: 'PERIOD SPENT' },
    { name: 'e', title: 'PROBATION PERIOD' },
    { name: 'f', title: 'NEXT POSITION' },
    { name: 'g', title: 'LAST PROMOTION' },
    { name: 'h', title: 'SUBMITTED' },
    { name: 'K', title: 'STATUS' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
