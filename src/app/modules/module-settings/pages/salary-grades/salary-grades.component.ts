import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from 'app/@core/utils';
import { ColumnTypes, TableAction, TableActionEvent } from 'app/components/tablecomponent/models';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { ConfirmBoxService } from 'app/_services/confirm-box.service';
import { DataServiceProxy, LGA, State, StateIListApiResult } from 'app/_services/service-proxies';
import { BaseComponent } from '../../base/base.component';
import { PageService } from '../../services/page.service';
import { MySalaryGrade, SalaryGradeFilter, SalaryGradeService } from '../../services/salary-grades.service';

enum TOP_ACTIONS { ADD, }
enum ACTIONS { EDIT = '1', DELETE = '2', STEPS = '3' }
const SUCCESS_MESSAGES = {
  create: 'Department Created Successfully',
  edit: 'Department Edited Successfully',
  delete: 'Department Deleted Successfully',
};
@Component({
  selector: 'ngx-salary-grades',
  templateUrl: './salary-grades.component.html',
  styleUrls: ['./salary-grades.component.scss']
})
export class SalaryGradesComponent  extends BaseComponent<MySalaryGrade,
SalaryGradeFilter, MySalaryGrade> implements OnInit {
  topActionButtons = [
    { name: TOP_ACTIONS.ADD, label: 'Add Salary Grade', icon: '', outline: false },
  ];

  // TOP_ACTIONS = TOP_ACTIONS;

  tableColumns = [
    { name: 'name', title: 'Name' },
    { name: 'noOfLeaveDays', title: 'No of Leave Days' },
    { name: 'promotion_min_years', title: 'Promo. Min. Years' },
    { name: 'no_of_steps', title: 'No of Steps'}
  ];

  tableActions: TableAction[] = [
    { name: ACTIONS.EDIT, label: 'Edit' },
    { name: ACTIONS.DELETE, label: 'Delete' },
    { name: ACTIONS.STEPS, label: 'Steps'}
  ];

  data: MySalaryGrade[] = [];
  successMessage = SUCCESS_MESSAGES.edit;
  // editingData = new VwDepartment();
  filter = {};

  getNewEditingData() { return new MySalaryGrade(); }

  saveData(data: MySalaryGrade) {
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
    this.editingData = new MySalaryGrade(temp);
    if (event.name === ACTIONS.EDIT) {
      this.showModal = true;
    }
    if (event.name === ACTIONS.DELETE) {
      this.deleteRow('Are you sure to delete this department?');
    }
    if (event.name === ACTIONS.STEPS) {
      this.router.navigateByUrl('/setup/salary-grade-step')
    }
  }

  deleteData() {
    return this.api.list({});
    //  return this.api.delete(this.data.find(dept => this.editingData.id === dept.id).department);
  }

  public constructor(
    private api: SalaryGradeService,
    private pageService: PageService,
    protected confirmBox: ConfirmBoxService,
    protected alertService: AlertserviceService,
    private dataService: DataServiceProxy,
    private router: Router,
  ) {
    super(confirmBox);
  }

  states: State[] = [];
  lgas: LGA[] = [];
  ngOnInit() {
    super.ngOnInit();
    this.dataService.getStates().subscribe(data => {
      this.states = data.result;
    });
  }

  updateLGAs(){
  }
  validator = {
    name: {
      presence: true,
    },
    noOfLeaveDays: {
      presence: true,
    },
    promotion_min_years: {
      presence: true,
    },
  };
}
