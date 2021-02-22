import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

enum TOP_ACTIONS {
  APPLY_FOR_LEAVE,
  INITIATE_VOLUNTARY_EXIT
}

@Component({
  selector: 'ngx-employmentexitmanagement',
  templateUrl: './employmentexitmanagement.component.html',
  styleUrls: ['./employmentexitmanagement.component.scss']
})
export class EmploymentexitmanagementComponent implements OnInit {
ExitManagement: string = 'Exit Management';

  topActionButtons = [

    {name: TOP_ACTIONS.INITIATE_VOLUNTARY_EXIT, label: 'Initiate Voluntary Exit', 'icon': 'plus', outline: false},
  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {

  }


  modal(buttion) {
    // if// (buttion === TOP_ACTIONS.APPLY_FOR_LEAVE) {
    //  this.showAddPlanModal = true;
  //  }
    if (buttion === TOP_ACTIONS.INITIATE_VOLUNTARY_EXIT) {
     this.router.navigateByUrl('/employeemodule/exitform');
    }
  }

}
