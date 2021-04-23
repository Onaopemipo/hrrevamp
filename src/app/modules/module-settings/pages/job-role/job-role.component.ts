import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'app/components/base/base.component';
import { FormConfig, FORM_TYPES } from 'app/components/custom-form/custom-form.component';
import { ChoiceName } from 'app/components/multi-select/multi-select.component';
import { ColumnTypes } from 'app/components/tablecomponent/models';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { CrudService, ListResult } from 'app/_services/base-api.service';
import { ConfirmBoxService } from 'app/_services/confirm-box.service';
import { Observable } from 'rxjs';
import { JobRoleService, MyJobRole } from '../../services/job-role.service';

type ModelType = MyJobRole;
type FilterType = {};

@Component({
  selector: 'ngx-job-role',
  templateUrl: './job-role.component.html',
  styleUrls: ['./job-role.component.scss']
})
export class JobRoleComponent extends BaseComponent<ModelType, FilterType, ModelType> {
  filter: {} = {};
  emptyConfig = {
    pageHeader: 'Create your first Job Role',
    pageDescription: 'Click on the button to create a Job Role',
    buttonValue: 'Create Job Role',
    actionName: '1',
  };
  data: ModelType[] = [];
  getData(): Observable<ListResult<ModelType>> {
    return this.api.list(this.filter);
  }
  saveData(e: ModelType): Observable<any> {
    return this.api.create(new MyJobRole(e));
  }
  getNewEditingData(): ModelType {
    return new MyJobRole();
  }
  successMessage: string = 'Job role saved successfully';
  deleteData(data: ModelType): Observable<any> {
    return this.api.delete(data.id);
  }

  tableColumns = [
    {name: 'name', title: 'Name'},
    {name: 'dateCreated', title: 'Date Modified', type: ColumnTypes.Date},
    {name: 'name', title: 'Status', type: ColumnTypes.Status},
  ]
  pageTitle = 'Job Roles';
  requiredButton = [{name: 'newTraining', label: 'New Job Role', icon: 'plus'}];
  formConfig: FormConfig = {
    fields: [
      {name: 'name', label: 'Name', type: FORM_TYPES.text, validator: {presence: true}},
      {name: 'code', label: 'Code', type: FORM_TYPES.text},
      {name: 'amount', label: 'Basic Salary for this Job role', type: FORM_TYPES.amount},
      {name: 'parent_job_role_id', label: 'Parent Job Role', singleSelection: true,
        type: FORM_TYPES.select, choice_name: ChoiceName.jobRoles}
    ]
  };
  formTitle = 'Add new Job role';
  constructor(
    protected confirmBox: ConfirmBoxService,
    protected alertService: AlertserviceService,
    private api: JobRoleService
    ) {
      super(confirmBox);
  }

}
