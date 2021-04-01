import { Position } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { StateService } from 'app/@core/utils';
import { FormConfig, FORM_TYPES } from 'app/components/custom-form/custom-form.component';
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
      {name: 'title', label: 'Title', type: FORM_TYPES.text},
      {name: 'description', label: 'Description', type: FORM_TYPES.wysiwyg},
      {name: 'promotion_min_years', label: 'Promotion Minimium Years', type: FORM_TYPES.number},
      {name: 'amount', label: 'Basic Salary', type: FORM_TYPES.amount},
      {name: 'parent_id', label: 'Parent Position', type: FORM_TYPES.select},
      {name: 'next_position_id', label: 'Next Position', type: FORM_TYPES.select},

      {name: 'qualifications', label: 'Qualifications', type: FORM_TYPES.select},
      {name: 'certifications', label: 'Certifications', type: FORM_TYPES.select},
      {name: 'min_years_experience', label: 'Minimium Years of Experience', type: FORM_TYPES.number},
    ]
  };
  formTitle = 'Add new Position';
}