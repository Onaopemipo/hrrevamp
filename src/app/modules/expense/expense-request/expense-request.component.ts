import { Component, OnInit } from '@angular/core';
import { ColumnTypes, TableAction, TableActionEvent, TableColumn } from 'app/components/tablecomponent/models';
import { MainBaseComponent } from 'app/components/main-base/main-base.component';
import { BaseComponent } from 'app/components/base/base.component';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { ConfirmBoxService } from 'app/_services/confirm-box.service';
import { of } from 'rxjs';
import { MyExpenseRequest, ExpenseRequestService } from '../services/expense-request.service';
import { GetExpenseProjectServiceProxy, GetExpenseTypesServiceProxy } from 'app/_services/service-proxies';


enum TABS { ALL__REQUESTS, APPROVED, PENDING, DECLINED, }
enum TOP_ACTIONS { CREATE_NEW, }
enum ACTIONS {EDIT = '1', DELETE = '2'}


@Component({
  selector: 'ngx-expense-request',
  templateUrl: './expense-request.component.html',
  styleUrls: ['./expense-request.component.scss']
})
export class ExpenseRequestComponent extends BaseComponent<MyExpenseRequest, Object, MyExpenseRequest> {
  projects = [];
  types = [];
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
    private projectApi: GetExpenseProjectServiceProxy,
    private typeApi: GetExpenseTypesServiceProxy,
  ) {
    super(confirmBox);
  }

  data = [];
  deleteData(){
    return of();
  }

  filter = {};

  getData() { return this.api.list(this.filter); }
  
  getNewEditingData() { 
    return new MyExpenseRequest();
   }

  saveData() {
    this.editingData.expenseProjectId = 1;
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

  ngOnInit(){
    this.projectApi.getExpenseProject(0, '', '', false, '', '', 1, 100).subscribe((data:any) => {
      console.log(data);
      this.projects = data;
    });
    this.typeApi.getExpenseTypes(0, '', '', '', '', '', 1, 100).subscribe(data => {
      this.types = data.result;
    });
    super.ngOnInit();
  }

}
