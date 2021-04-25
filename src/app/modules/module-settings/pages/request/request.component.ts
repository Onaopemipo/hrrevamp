import { Component, OnInit } from '@angular/core';
import { ColumnTypes, TableAction, TableActionEvent, TableColumn } from 'app/components/tablecomponent/models';
import { ApiService, DepartmentFilter, MyDepartment } from '../../services/api.service';
import { PageService } from '../../services/page.service';
import { BaseComponent } from '../../base/base.component';
import { ConfirmBoxService } from 'app/_services/confirm-box.service';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { Observable } from 'rxjs';

import { RequestFilter, RequestService, MyRequest } from '../../services/Requestservice';


enum TOP_ACTIONS { ADD_DEPARTMENT, }
enum ACTIONS { EDIT = '1', DELETE = '2' }
const SUCCESS_MESSAGES = {
  create: 'Department Created Successfully',
  edit: 'Department Edited Successfully',
  delete: 'Department Deleted Successfully',
};


@Component({
  selector: 'ngx-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent extends BaseComponent<MyRequest,RequestFilter, 
MyRequest>implements OnInit {
  

  topActionButtons = [
    { name: TOP_ACTIONS.ADD_DEPARTMENT, label: 'Add New Request Type', icon: '', outline: false },
  ];

  TOP_ACTIONS = TOP_ACTIONS;

  tableColumns = [
    { name: 'Name', title: 'Name' },
    // { name: 'Code', title: 'Code',  },
    // { name: 'Approval', title: 'Approval' },
    { name: 'Enable_Notification', title: 'Enable Notification', type: ColumnTypes.Status },
    { name: 'is_Active', title: 'Status', type: ColumnTypes.Status },
    { name: 'Date_Created', title: 'Date Created', type: ColumnTypes.Date },
 
  ];

  tableActions: TableAction[] = [
    { name: ACTIONS.EDIT, label: 'Edit' },
    { name: ACTIONS.DELETE, label: 'Delete' },
  ];

  data = [];
  successMessage = SUCCESS_MESSAGES.edit;
  // editingData = new VwDepartment();
  filter = {};

  getNewEditingData() { return new MyRequest(); }

  saveData(data: MyRequest) {
    console.log(1000)
    if (this.editingData.id) {
      this.successMessage = SUCCESS_MESSAGES.edit;
    } else {
      this.successMessage = SUCCESS_MESSAGES.create;
    }
    const request = new MyRequest().fromObj(this.editingData);
    return this.Api.create(request);
  }

  getData() {
    return this.Api.list(this.filter);
  }

  tableActionClicked(event: TableActionEvent) {
    // const data: any = event.data;
    // const tempDepartment: MyDepartment = {...event.data};
    // this.editingData = {
    //   ...editingObject,
    //   ...{ department_name: tempDepartment.name, code: tempDepartment.code, id: tempDepartment.id }
    // };
    const temp: any = event.data;
    this.editingData = new MyRequest(temp);
    if (event.name === ACTIONS.EDIT) {
      this.showModal = true;
    }
    if (event.name === ACTIONS.DELETE) {
      this.deleteRow('Are you sure to delete this department?');
    }
  }

  deleteData() {
    return this.Api.list({});
    //  return this.api.delete(this.data.find(dept => this.editingData.id === dept.id).department);
  }

  public constructor(
    private Api: RequestService,
    private pageService: PageService,
    protected confirmBox: ConfirmBoxService,
    protected alertService: AlertserviceService,
  ) {
    super(confirmBox);
  }

  validator = {
    Name: {
      presence: true,
    },
    Code: {
      presence: true,
    },
  };
}
