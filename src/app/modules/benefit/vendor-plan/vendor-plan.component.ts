import { Component, OnInit } from "@angular/core";
import {
  ColumnTypes,
  TableAction,
  TableActionEvent,
} from "app/components/tablecomponent/models";
import { FormGroup } from "@angular/forms";
import { Event } from '../../../_services/service-proxies';

enum ACTIONS {
  EDIT = "1",
  DELETE = "2",
}
@Component({
  selector: "ngx-vendor-plan",
  templateUrl: "./vendor-plan.component.html",
  styleUrls: ["./vendor-plan.component.scss"],
})
export class VendorPlanComponent implements OnInit {
  showLeaveYearModal: boolean = false;
  submitbtnPressed: boolean = false;
  EventForm: FormGroup;
  loading: boolean = false;
  showEvent: boolean = false;
  Event
  showPlan:boolean= false
  // tableActions: TableAction[] = [
  topActionButtons = [
    {
      name: "add_leave_year",
      label: "Create Vendor",
      icon: "plus",
      outline: false,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
  modal(event) {
    if (event == "add_leave_year") {
      this.showEvent = true;
    }
  }

  AddPlan(){
    alert('hello world')
    this.showPlan= true
  }

}
