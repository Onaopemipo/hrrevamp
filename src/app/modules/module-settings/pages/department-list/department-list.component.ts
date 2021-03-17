import { Component, OnInit } from '@angular/core';
import { ColumnTypes, TableAction, TableActionEvent, TableColumn } from 'app/components/tablecomponent/models';
import { Department, MessageOutIListApiResult,} from 'app/_services/service-proxies';
import { ApiService, DepartmentFilter, MyDepartment } from '../../services/api.service';
import { PageService } from '../../services/page.service';
import { BaseComponent } from '../../base/base.component';
import { ConfirmBoxService } from 'app/_services/confirm-box.service';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { Observable } from 'rxjs';

enum TOP_ACTIONS { ADD_DEPARTMENT, }
enum ACTIONS {EDIT = '1', DELETE = '2'}
const SUCCESS_MESSAGES = {
  create: 'Department Created Successfully',
  edit: 'Department Edited Successfully',
  delete: 'Department Deleted Successfully',
};

@Component({
  selector: 'ngx-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent  implements OnInit {
  topActionButtons = [
    { name: TOP_ACTIONS.ADD_DEPARTMENT, label: 'Add Department', icon: '', outline: false },
  ];

  TOP_ACTIONS = TOP_ACTIONS;

  tableColumns = [
    { name: 'name', title: 'Department Name' },
    { name: 'code', title: 'Department Code' },
    { name: 'status', title: 'Status', type: ColumnTypes.Status },
  ];

  tableActions: TableAction[] = [
    {name: ACTIONS.EDIT, label: 'Edit'},
    {name: ACTIONS.DELETE, label: 'Delete'},
  ];

  data: MyDepartment[] = [];
  successMessage = SUCCESS_MESSAGES.edit;
  // editingData = new VwDepartment();
  filter = {};

  //getNewEditingData() { return new VwDepartment();}

  // saveData(data: VwDepartment) {
  //   if (this.editingData.id) {
  //     this.successMessage = SUCCESS_MESSAGES.edit;
  //   } else {
  //     this.successMessage = SUCCESS_MESSAGES.create;
  //   }
  //   return this.setup.addandUpdateDepartment(this.editingData);
  // }

  getData() {
    return this.api.fetchAllEmployees(this.filter);
  }

  // tableActionClicked(event: TableActionEvent) {
  //   const editingObject = this.getNewEditingData().toJSON();
  //   const data: any = event.data;
  //   const tempDepartment: MyDepartment = data;
  //   this.editingData = { ...editingObject,
  //     ...{department_name: tempDepartment.name, code: tempDepartment.code, id: tempDepartment.id} };
  //   if (event.name === ACTIONS.EDIT) {
  //     this.showModal = true;
  //   }
  //   if (event.name === ACTIONS.DELETE) {
  //     this.deleteRow('Are you sure to delete this department?');
  //   }
  // }

  // deleteData() {
 
  //  return this.setup.delete_Department_Records(this.data.find(dept => this.editingData.id === dept.id).department);
  // }

  public constructor(
    private api: ApiService,
    private pageService: PageService,
    protected confirmBox: ConfirmBoxService,
    protected alertService: AlertserviceService,
  ) {
  //  super(confirmBox);
  }

  ngOnInit() {
    
  }
}
