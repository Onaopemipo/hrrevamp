import { Component, OnInit } from '@angular/core';


enum TOP_ACTIONS {
  SUBMIT_LIST,
  SAVE_LIST,
  UPDATE_LIST
}

@Component({
  selector: 'ngx-anothereligibilitylist',
  templateUrl: './anothereligibilitylist.component.html',
  styleUrls: ['./anothereligibilitylist.component.scss']
})
export class AnothereligibilitylistComponent implements OnInit {
  showUpdateList = false;

  topActionButtons = [
    {name: TOP_ACTIONS.SUBMIT_LIST, label: 'Submit List', 'icon': 'plus', outline: true},
    {name: TOP_ACTIONS.SAVE_LIST, label: 'Save List', 'icon': 'plus', outline: false},
    {name: TOP_ACTIONS.UPDATE_LIST, label: 'Update List', 'icon': 'plus', outline: true},


  ];


  tableColumns = [
    { name: 'a', title: 'S/N' },
    { name: 'b', title: 'NAME' },
    { name: 'c', title: 'DATE CREATED' },
    { name: 'd', title: 'GENERATED BY' },
    { name: 'e', title: 'STATUS' },

  ];

  constructor() { }

  ngOnInit(): void {
  }
  modal(buttion) {
    // if// (buttion === TOP_ACTIONS.APPLY_FOR_LEAVE) {
    //  this.showAddPlanModal = true;
  //  }
    if (buttion === TOP_ACTIONS.SAVE_LIST) {

    }
    if (buttion === TOP_ACTIONS.UPDATE_LIST) {
     this.showUpdateList = true;
    }
  }

}
