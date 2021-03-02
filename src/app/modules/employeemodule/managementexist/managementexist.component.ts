import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


enum TOP_ACTIONS {
  APPLY_FOR_LEAVE,
  INITIATE_VOLUNTARY_EXIT
}


@Component({
  selector: 'ngx-managementexist',
  templateUrl: './managementexist.component.html',
  styleUrls: ['./managementexist.component.scss']
})
export class ManagementexistComponent implements OnInit {
ExitManagement: string = 'Exit Management';
selectedOption: string = '';
  topActionButtons = [
    {name: TOP_ACTIONS.APPLY_FOR_LEAVE, label: 'Cancel resignation', 'icon': 'plus', outline: true},

  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  modal(buttion) {
    if (buttion === TOP_ACTIONS.APPLY_FOR_LEAVE) {
      this.router.navigateByUrl('/employeemodule/exitmanagement');
    }

  }
}
