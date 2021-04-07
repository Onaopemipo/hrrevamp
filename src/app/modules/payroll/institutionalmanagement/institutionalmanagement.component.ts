import { Component, OnInit } from '@angular/core';

enum TOP_ACTIONS {
  APPLY_FOR_LEAVE,
  INITIATE_VOLUNTARY_EXIT
}


@Component({
  selector: 'ngx-institutionalmanagement',
  templateUrl: './institutionalmanagement.component.html',
  styleUrls: ['./institutionalmanagement.component.scss']
})
export class InstitutionalmanagementComponent implements OnInit {

  topActionButtons = [
    {name: TOP_ACTIONS.APPLY_FOR_LEAVE, label: 'Add Institution', 'icon': 'plus', outline: false},

  ];

  tableColumns = [
    { name: 'a', title: 'NAME' },
    { name: 'b', title: 'INDUSTRY' },
    { name: 'c', title: 'ACCOUNT NAME' },
    { name: 'd', title: 'ACCOUNT NUMBER' },
    { name: 'e', title: 'BANK' },
   
  ];


  constructor() { }

  ngOnInit(): void {
  }
modal(button){

}
}
