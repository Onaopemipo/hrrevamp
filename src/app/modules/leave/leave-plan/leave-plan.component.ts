import { Component, OnInit } from '@angular/core';

enum TOP_ACTIONS {
  APPLY_FOR_LEAVE,
  ADD_PLAN
}

@Component({
  selector: 'ngx-leave-plan',
  templateUrl: './leave-plan.component.html',
  styleUrls: ['./leave-plan.component.scss']
})
export class LeavePlanComponent implements OnInit {

  get hel() {
    return 'me';
  }
  set hello(val: string) {
    alert(val);
  }
  topActionButtons = [
    {name: TOP_ACTIONS.APPLY_FOR_LEAVE, label: 'Apply For Leave', 'icon': 'plus', outline: true},
    {name: TOP_ACTIONS.ADD_PLAN, label: 'Add Plan', 'icon': 'plus', outline: false},
  ];
  tableColumns = [
    {name: 'a', title: 'Number'},
    {name: 'b', title: 'Name'},
    {name: 'c', title: 'Department'},
    {name: 'd', title: 'Designation'},
  ];
  get showFirstName() {
    return this.selectedOption === '1';
  }
  constructor() { }

  ngOnInit(): void {
  }
  selectedOption = '1';
  b = 'mmm';
  value = 'aaaa';

  modal(buttion) {
    if (buttion === TOP_ACTIONS.APPLY_FOR_LEAVE) {
      this.showAddPlanModal = true;
    }
    if (buttion === TOP_ACTIONS.ADD_PLAN) {
     this.showLeavePlanModal = true;
    }
  value = 'aaaa';
  onClick() {
    this.hello = this.value;
    this.b = this.hello;
  }
  firstName = 'a';
  // lastName = 'b'
  get fullName() {
    return this.firstName + ' ' + this.lastName;
  }
  showAddPlanModal = false;
  showLeavePlanModal = false;


  checked = false;

  toggle(checked: boolean) {
    this.checked = checked;
  set lastName(val: string) {
    if (val.length === 5) {
      if (val === 'bbbbb')
      alert('You can continue');
      else
      alert('Password validation failed');
    }
  }
}

