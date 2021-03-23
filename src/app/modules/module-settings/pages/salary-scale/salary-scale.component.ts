import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from 'app/@core/utils';
import { ColumnTypes, TableAction, TableActionEvent } from 'app/components/tablecomponent/models';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { ConfirmBoxService } from 'app/_services/confirm-box.service';
import { DataServiceProxy, LGA, State, StateIListApiResult } from 'app/_services/service-proxies';
import { BaseComponent } from '../../base/base.component';
import { PageService } from '../../services/page.service';
import { MySalaryScale, SalaryScaleFilter, SalaryScaleService } from '../../services/salary-scale.service';

enum TOP_ACTIONS { ADD, }
enum ACTIONS { EDIT = '1', DELETE = '2', GRADES = '3' }
const SUCCESS_MESSAGES = {
  create: 'Department Created Successfully',
  edit: 'Department Edited Successfully',
  delete: 'Department Deleted Successfully',
};
@Component({
  selector: 'ngx-salary-scale',
  templateUrl: './salary-scale.component.html',
  styleUrls: ['./salary-scale.component.scss']
})
export class SalaryScaleComponent  extends BaseComponent<MySalaryScale,
SalaryScaleFilter, MySalaryScale> implements OnInit {
  topActionButtons = [
    { name: TOP_ACTIONS.ADD, label: 'Add Salary Scale', icon: '', outline: false },
  ];
  // TOP_ACTIONS = TOP_ACTIONS;

  tableColumns = [
    { name: 'name', title: 'Name' },
    { name: 'code', title: 'Code' },
    { name: '', title: 'Status', type: ColumnTypes.Status },
  ];

  tableActions: TableAction[] = [
    { name: ACTIONS.EDIT, label: 'Edit' },
    { name: ACTIONS.DELETE, label: 'Delete' },
    { name: ACTIONS.GRADES, label: 'Grades'},
  ];

  data: MySalaryScale[] = [];
  successMessage = SUCCESS_MESSAGES.edit;
  // editingData = new VwDepartment();
  filter = {};

  getNewEditingData() { return new MySalaryScale(); }

  saveData(data: MySalaryScale) {
    console.log(1000)
    if (this.editingData.id) {
      this.successMessage = SUCCESS_MESSAGES.edit;
    } else {
      this.successMessage = SUCCESS_MESSAGES.create;
    }
    return this.api.create(this.editingData);
  }

  getData() {
    return this.api.list(this.filter);
  }

  tableActionClicked(event: TableActionEvent) {
    const temp: any = event.data;
    this.editingData = new MySalaryScale(temp);
    if (event.name === ACTIONS.EDIT) {
      this.showModal = true;
    }
    if (event.name === ACTIONS.DELETE) {
      this.deleteRow('Are you sure to delete this department?');
    }
    if (event.name === ACTIONS.GRADES) {
      this.router.navigateByUrl('/setup/salary-grade'); 
    }
  }

  deleteData() {
    return this.api.list({});
    //  return this.api.delete(this.data.find(dept => this.editingData.id === dept.id).department);
  }

  public constructor(
    private api: SalaryScaleService,
    private pageService: PageService,
    protected confirmBox: ConfirmBoxService,
    protected alertService: AlertserviceService,
    private dataService: DataServiceProxy,
    private router: Router,
  ) {
    super(confirmBox);
  }

  validator = {
    name: {
      presence: true
    },
    code: {
      presence: true
    }
  };
}
