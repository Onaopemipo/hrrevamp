import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'app/components/base/base.component';
import { FormConfig, FORM_TYPES } from 'app/components/custom-form/custom-form.component';
import { EmptyConfig } from 'app/components/page/page.component';
import { ColumnTypes } from 'app/components/tablecomponent/models';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { CrudService, ListResult } from 'app/_services/base-api.service';
import { ConfirmBoxService } from 'app/_services/confirm-box.service';
import { Observable } from 'rxjs';
import { MyTrainingCategory, TrainingCategoryService } from '../services/training-category.service';

type ModelType = MyTrainingCategory;
type FilterType = {};

@Component({
  selector: 'ngx-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent extends BaseComponent<ModelType, FilterType, ModelType> {
  filter: {} = {};
  data: ModelType[] = [];
  getData(): Observable<ListResult<ModelType>> {
    return this.api.list(this.filter);
  }
  saveData(e: ModelType): Observable<any> {
    return this.api.create(e);
  }
  getNewEditingData(): ModelType {
    return new MyTrainingCategory();
  }
  successMessage: string = 'Category saved successfully';
  deleteData(data: ModelType): Observable<any> {
    return this.api.delete(data.id);
  }

  tableColumns = [
    {name: 'name', title: 'Name'},
    {name: 'date_Created', title: 'Date Modified', type: ColumnTypes.Date},
    {name: 'name', title: 'Status', type: ColumnTypes.Status},
  ]
  pageTitle = 'Training Categories';
  requiredButton = [{name: 'newTraining', label: 'New Specialization', icon: 'plus'}];
  formConfig: FormConfig = {
    fields: [
      {name: 'name', label: 'Name', type: FORM_TYPES.text}
    ]
  };
  formTitle = 'Add new Specialization';
  emptyConfig: EmptyConfig = {
    pageHeader: 'Create your first Specialization',
    pageDescription: '',
    buttonValue: 'Create Specialization',
  }
  constructor(
    protected confirmBox: ConfirmBoxService,
    protected alertService: AlertserviceService,
    private api: TrainingCategoryService
    ) {
      super(confirmBox);
  }

}
