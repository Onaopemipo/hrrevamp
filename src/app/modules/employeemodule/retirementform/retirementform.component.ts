import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-retirementform',
  templateUrl: './retirementform.component.html',
  styleUrls: ['./retirementform.component.scss']
})
export class RetirementformComponent implements OnInit {
  selectedOption = ''
  constructor() { }

  ngOnInit(): void {
  }
   
  modal(buttion) {
    //if// (buttion === TOP_ACTIONS.APPLY_FOR_LEAVE) {
    //  this.showAddPlanModal = true;
  //  }
   // if (buttion === TOP_ACTIONS.INITIATE_VOLUNTARY_EXIT) {
     //this.router.navigateByUrl('/employeemodule/retirementform')
   // }
  }
checked = false
  toggle(checked:boolean){
  this.checked = checked
  }
}
