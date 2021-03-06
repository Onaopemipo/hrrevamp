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

  selectedCase: string = 'personal_Info';
  selectedPanel: any = { title: 'personal_Info', label: 'Personal Information', status: 'Active' };
  employeeviewlist = [
    { title: 'personal_Info', label: 'Personal Information', status: 'Active', iconname: 'person' },
    { title: 'promotion_info', label: 'Promotion Information', status: 'Inactive' , iconname: 'volume-down'},

  ];
  constructor() { }
  selectPanel(hiringlist, i) {
    this.selectedPanel = hiringlist;

    this.employeeviewlist.forEach(value => {
      value.status = 'Inactive';
    });
    this.employeeviewlist[i].status = 'Active';
    this.selectedCase = this.employeeviewlist[i].title;
  }
  ngOnInit(): void {
  }

}
