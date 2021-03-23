import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'app/components/base/base.component';
import { FormConfig, FORM_TYPES } from 'app/components/custom-form/custom-form.component';
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
      {name: 'name', label: 'Name', type: FORM_TYPES.text},
      {name: 'code', label: 'Code', type: FORM_TYPES.text},
      {name: '', label: 'Basic Salary for this Job role', type: FORM_TYPES.amount},
      {name: '', label: 'Parent Positions', type: FORM_TYPES.select}
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
