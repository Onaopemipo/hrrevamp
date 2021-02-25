import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-promotioninfo',
  templateUrl: './promotioninfo.component.html',
  styleUrls: ['./promotioninfo.component.scss']
})
export class PromotioninfoComponent implements OnInit {


  tableColumns = [
    { name: 'a', title: 'NAME OF QUALIFICATION' },
    { name: 'b', title: 'TYPE' },
    { name: 'c', title: 'COURSE' },
    { name: 'd', title: 'INSTITUTION' },
    { name: 'e', title: 'START DATE' },
    { name: 'f', title: 'END DATE' },
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
