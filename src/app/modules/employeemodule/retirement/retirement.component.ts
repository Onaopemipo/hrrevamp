import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


enum TOP_ACTIONS {
  APPLY_FOR_LEAVE,
  INITIATE_VOLUNTARY_EXIT
}

@Component({
  selector: 'ngx-retirement',
  templateUrl: './retirement.component.html',
  styleUrls: ['./retirement.component.scss']
})
export class RetirementComponent implements OnInit {

  topActionButtons = [
    
    {name: TOP_ACTIONS.INITIATE_VOLUNTARY_EXIT, label: 'Initiate Retirement', 'icon': 'plus', outline: false},
  ];

  
  tableColumns = [
    { name: 'a', title: 'id' },
    { name: 'b', title: 'Full Name' },
    { name: 'c', title: 'Date Requested' },
    { name: 'd', title: 'End Date' },
    { name: 'e', title: 'Type' },
    { name: 'f', title: 'Status' },
  ];


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  modal(buttion) {
    //if// (buttion === TOP_ACTIONS.APPLY_FOR_LEAVE) {
    //  this.showAddPlanModal = true;
  //  }
  //  if (buttion === TOP_ACTIONS.INITIATE_VOLUNTARY_EXIT) {
    // this.router.navigateByUrl('/employeemodule/retirementform')
   // }
  }

}
