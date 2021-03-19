import { Component, OnInit } from '@angular/core';
import { StateService } from 'app/@core/utils';
import { ColumnTypes, TableAction, TableActionEvent } from 'app/components/tablecomponent/models';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { ConfirmBoxService } from 'app/_services/confirm-box.service';
import { DataServiceProxy, LGA, State, StateIListApiResult } from 'app/_services/service-proxies';
import { MyGradeStep, GradeStepFilter, GradeStepService } from '../../services/salary-grade-step.service';
import { BaseComponent } from '../../base/base.component';
import { PageService } from '../../services/page.service';

enum TOP_ACTIONS { ADD, }
enum ACTIONS { EDIT = '1', DELETE = '2' }
const SUCCESS_MESSAGES = {
  create: 'Department Created Successfully',
  edit: 'Department Edited Successfully',
  delete: 'Department Deleted Successfully',
};
@Component({
  selector: 'ngx-grade-step',
  templateUrl: './grade-step.component.html',
  styleUrls: ['./grade-step.component.scss']
})
export class GradeStepComponent extends BaseComponent<MyGradeStep,
GradeStepFilter, MyGradeStep> implements OnInit {
  topActionButtons = [
    { name: TOP_ACTIONS.ADD, label: 'Add Salary Grade Step', icon: '', outline: false },
  ];

  // TOP_ACTIONS = TOP_ACTIONS;

  tableColumns = [
    { name: 'name', title: 'Name' },
    { name: 'grade', title: 'Grade' },
    { name: 'step_no', title: 'Step No' },
    { name: 'lga', title: 'Promo. Min. Years' },
    { name: 'lga', title: 'Next Grade Step' },
    // { name: '', title: 'Status', type: ColumnTypes.Status },
  ];

  tableActions: TableAction[] = [
    { name: ACTIONS.EDIT, label: 'Edit' },
    { name: ACTIONS.DELETE, label: 'Delete' },
  ];

  data: MyGradeStep[] = [];
  successMessage = SUCCESS_MESSAGES.edit;
  // editingData = new VwDepartment();
  filter = {};

  getNewEditingData() { return new MyGradeStep(); }

  saveData(data: MyGradeStep) {
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
    this.editingData = new MyGradeStep(temp);
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
    private api: GradeStepService,
    private pageService: PageService,
    protected confirmBox: ConfirmBoxService,
    protected alertService: AlertserviceService,
    private dataService: DataServiceProxy,
  ) {
    super(confirmBox);
  }

  validator = {
  };
}
