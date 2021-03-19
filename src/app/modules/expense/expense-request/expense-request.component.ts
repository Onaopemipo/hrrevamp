import { Component, OnInit } from '@angular/core';
import { ColumnTypes, TableAction, TableActionEvent, TableColumn } from 'app/components/tablecomponent/models';
import { MainBaseComponent } from 'app/components/main-base/main-base.component';
import { BaseComponent } from 'app/components/base/base.component';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { ConfirmBoxService } from 'app/_services/confirm-box.service';
import { of } from 'rxjs';
import { MyExpenseRequest, ExpenseRequestService } from '../services/expense-request.service';


enum TABS { ALL__REQUESTS, APPROVED, PENDING, DECLINED, }
enum TOP_ACTIONS { CREATE_NEW, }
enum ACTIONS {EDIT = '1', DELETE = '2'}


@Component({
  selector: 'ngx-expense-request',
  templateUrl: './expense-request.component.html',
  styleUrls: ['./expense-request.component.scss']
})
export class ExpenseRequestComponent extends BaseComponent<MyExpenseRequest, {}, MyExpenseRequest> {
  topActionButtons = [
    { name: 'CREATE_NEW', label: 'Create new', icon: 'plus', outline: false },
  ];
  TOP_ACTIONS = TOP_ACTIONS;
  TABS = TABS;
  selectedTab = TABS.ALL__REQUESTS;
  tableColumns = [
    { name: 'date', title: 'REF ID' },
    { name: 'date', title: 'Employee' },
    { name: 'date', title: 'Project' },
    { name: 'date', title: 'Type' },
    { name: 'date', title: 'Amount' }
  ];
  tableActions: TableAction[] = [
    {name: ACTIONS.EDIT, label: 'Edit'},
    {name: ACTIONS.DELETE, label: 'Delete'},
  ];

  public constructor(
    protected alertService: AlertserviceService,
    protected confirmBox: ConfirmBoxService,
    private api: ExpenseRequestService,
  ) {
    super(confirmBox);
  }

  data = [];
  deleteData(){
    return of();
  }

  filter = {};

  getData() { return this.api.list(this.filter); }
  
  getNewEditingData() { return {}; }

  saveData() {
    return this.api.create(this.editingData);
  }

  tableActionClicked(event: TableActionEvent) {
    this.editingData = event.data;
    if (event.name === ACTIONS.EDIT) {
      this.showModal = true;
    }
    if (event.name === ACTIONS.DELETE) {
      this.deleteRow('Are you sure to delete this department?');
    }
  }

  successMessage = "Hello";

}
