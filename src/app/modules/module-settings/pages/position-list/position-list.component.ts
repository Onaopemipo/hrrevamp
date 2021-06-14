import { Position } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { StateService } from 'app/@core/utils';
import { FormConfig, FORM_TYPES } from 'app/components/custom-form/custom-form.component';
import { ChoiceName } from 'app/components/multi-select/multi-select.component';
import { ColumnTypes, TableAction, TableActionEvent } from 'app/components/tablecomponent/models';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { ConfirmBoxService } from 'app/_services/confirm-box.service';
import { DataServiceProxy, LGA, State, StateIListApiResult } from 'app/_services/service-proxies';
import { BaseComponent } from '../../base/base.component';
import { LocationFilter, MyLocation } from '../../services/location.service';
import { LocationService } from '../../services/location.service';
import { PageService } from '../../services/page.service';
import { MyPosition, PositionFilter, PositionService } from '../../services/position.service';

enum TOP_ACTIONS { ADD, }
enum ACTIONS { EDIT = '1', DELETE = '2' }
const SUCCESS_MESSAGES = {
  create: 'Department Created Successfully',
  edit: 'Department Edited Successfully',
  delete: 'Department Deleted Successfully',
};

@Component({
  selector: 'ngx-position-list',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.scss']
})
export class PositionListComponent extends BaseComponent<MyPosition,
PositionFilter, MyPosition> implements OnInit {
  topActionButtons = [
    { name: TOP_ACTIONS.ADD, label: 'Add Position', icon: '', outline: false },
  ];

  // TOP_ACTIONS = TOP_ACTIONS;

  tableColumns = [
    { name: 'title', title: 'Title' },
    { name: 'min_years_experience', title: 'Minimum years of experience' },
    { name: 'promotion_min_years', title: 'Promotion minimum years' },
    { name: '', title: 'Status', type: ColumnTypes.Status },
  ];

  tableActions: TableAction[] = [
    { name: ACTIONS.EDIT, label: 'Edit' },
    { name: ACTIONS.DELETE, label: 'Delete' },
  ];

  data: MyPosition[] = [];
  successMessage = SUCCESS_MESSAGES.edit;
  // editingData = new VwDepartment();
  filter = {};

  getNewEditingData() { return new MyPosition(); }

  saveData(data: MyPosition) {
    console.log(data)
    if (this.editingData.id) {
      this.successMessage = SUCCESS_MESSAGES.edit;
    } else {
      this.successMessage = SUCCESS_MESSAGES.create;
    }
    const new_data = this.getNewEditingData();
    Object.assign(new_data, data);
    return this.api.create(new_data);
  }

  getData() {
    return this.api.list(this.filter);
  }

  tableActionClicked(event: TableActionEvent) {
    const temp: any = event.data;
    this.editingData = new MyPosition(temp.department);
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
    private api: PositionService,
    private pageService: PageService,
    protected confirmBox: ConfirmBoxService,
    protected alertService: AlertserviceService,
    private dataService: DataServiceProxy,
  ) {
    super(confirmBox);
  }

  pageTitle = 'Positions';
  requiredButton = [{name: 'newTraining', label: 'New Position', icon: 'plus'}];
  formConfig: FormConfig = {
    fields: [
      {name: 'title', label: 'Title', type: FORM_TYPES.text, validator: {presence: true}},
      {name: 'description', label: 'Description', type: FORM_TYPES.textarea, validator: {presence: true}},
      {name: 'promotion_min_years', label: 'Promotion Minimium Years', type: FORM_TYPES.number},
      {name: 'amount', label: 'Basic Salary', type: FORM_TYPES.amount},
      {name: 'parent_id', label: 'Parent Position', type: FORM_TYPES.select, choice_name: ChoiceName.positions, singleSelection: true},
      {name: 'next_position_id', label: 'Next Position', type: FORM_TYPES.select, choice_name: ChoiceName.positions, singleSelection: true},

      {name: 'selectedQualifications', label: 'Qualifications', type: FORM_TYPES.select, choice_name: ChoiceName.qualifications},
      {name: 'selectedCertifications', label: 'Certifications', type: FORM_TYPES.select, choice_name: ChoiceName.certifications},
      {name: 'min_years_experience', label: 'Minimium Years of Experience', type: FORM_TYPES.number},
    ]
  };
  formTitle = 'Add new Position';

  validator = {
    // title: {
    //   presence: true,
    // },
    // description: {
    //   presence: true
    // }
  };
}
