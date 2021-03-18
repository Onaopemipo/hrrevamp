import { LeaveTypeDTO } from './../../../_services/service-proxies';
import { FormGroup } from '@angular/forms';
import { Component, OnInit , Input} from '@angular/core';


enum TOP_ACTIONS {
  ADD_LEAVE_TYPE,

}

@Component({
  selector: 'ngx-leavetype',
  templateUrl: './leavetype.component.html',
  styleUrls: ['./leavetype.component.scss']
})

export class LeavetypeComponent implements OnInit {

  LeaveType: string = 'Leave Type';
  myForm: FormGroup;
  inputText: string = 'Attach';

  leaveTypeModel: LeaveTypeDTO = new LeaveTypeDTO().clone();

  topActionButtons = [
    {name: TOP_ACTIONS.ADD_LEAVE_TYPE, label: 'Add Leave Type', 'icon': 'plus', outline: false},

  ];


  tableColumns = [
    {name: 'a', title: 'Description'},
    {name: 'b', title: 'Deductible From Annual Leave'},
    {name: 'c', title: 'Allow Gender'},
    {name: 'd', title: 'Max No Of Days'},
  ];
  constructor() { }

  ngOnInit(): void {
  }


  modal(buttion) {
    if (buttion === TOP_ACTIONS.ADD_LEAVE_TYPE) {
     this.showLeaveTypeModal = true;

    }

  }

  showLeaveTypeModal = false;
}
