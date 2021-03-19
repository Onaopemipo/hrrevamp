import { Component, OnInit } from '@angular/core';
import { ColumnTypes, TableAction, TableActionEvent, TableColumn } from 'app/components/tablecomponent/models';
import { ApiService, DepartmentFilter, MyDepartment } from '../../services/api.service';
import { PageService } from '../../services/page.service';
import { BaseComponent } from '../../base/base.component';
import { ConfirmBoxService } from 'app/_services/confirm-box.service';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { Observable } from 'rxjs';
import { GenericFilter, GenericService, MyGeneric } from '../../services/generic.service';

enum TOP_ACTIONS { ADD_DEPARTMENT, }
enum ACTIONS { EDIT = '1', DELETE = '2' }
const SUCCESS_MESSAGES = {
  create: 'Department Created Successfully',
  edit: 'Department Edited Successfully',
  delete: 'Department Deleted Successfully',
};
@Component({
  selector: 'ngx-generic',
  templateUrl: './generic.component.html',
  styleUrls: ['./generic.component.scss']
})
export class GenericComponent extends BaseComponent<MyGeneric,
GenericFilter, MyGeneric> implements OnInit {



  // topActionButtons = [
  //   { name: TOP_ACTIONS.ADD_DEPARTMENT, label: 'Add Events', icon: '', outline: false },
  // ];

  TOP_ACTIONS = TOP_ACTIONS;

  tableColumns = [
    { name: 'Sn', title: 'Sn' },
    { name: 'DropdownName', title: 'DropdownName' },
    { name: 'status', title: 'Status', type: ColumnTypes.Status },
    { name: 'DateCreated', title: 'Date Created' },
  ];

  tableActions: TableAction[] = [
    { name: ACTIONS.EDIT, label: 'Edit' },
    { name: ACTIONS.DELETE, label: 'Delete' },
  ];

  data = [];
  successMessage = SUCCESS_MESSAGES.edit;
  // editingData = new VwDepartment();
  filter = {};

  getNewEditingData() { return new MyGeneric(); }

  saveData(data: MyGeneric) {
    console.log(1000)
    if (this.editingData.id) {
      this.successMessage = SUCCESS_MESSAGES.edit;
    } else {
      this.successMessage = SUCCESS_MESSAGES.create;
    }
    return this.api.fetch(this.editingData);
  }

  getData() {
    return this.api.list(this.filter);
  }

  tableActionClicked(event: TableActionEvent) {
    // const data: any = event.data;
    // const tempDepartment: MyDepartment = {...event.data};
    // this.editingData = {
    //   ...editingObject,
    //   ...{ department_name: tempDepartment.name, code: tempDepartment.code, id: tempDepartment.id }
    // };
    const temp: any = event.data;
    this.editingData = new MyGeneric(temp);
    if (event.name === ACTIONS.EDIT) {
      this.showModal = true;
    }
    if (event.name === ACTIONS.DELETE) {
      this.deleteRow('Are you sure to delete this department?');
    }
  }

  deleteData() {
    return this.api.list({});
    //  return this.api.delete(this.data.find(dept => this.editingData.id === dept.id).department);
  }

  public constructor(
    private api: GenericService,
    private pageService: PageService,
    protected confirmBox: ConfirmBoxService,
    protected alertService: AlertserviceService,
  ) {
    super(confirmBox);
  }

  validator = {
    Title: {
      presence: true,
    },
  };


}
