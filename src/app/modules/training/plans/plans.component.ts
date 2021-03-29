import { TableColumn } from 'app/components/tablecomponent/models';
import { TopAction } from './../../../components/componentsheader/models';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { NbTabComponent } from '@nebular/theme';
import { BaseComponent } from 'app/components/base/base.component';
import { MyTrainingPlan, TrainingPlanService } from '../services/plan.service';
import { ListResult } from 'app/_services/base-api.service';
import { Observable } from 'rxjs';
import { FormConfig, FORM_TYPES } from 'app/components/custom-form/custom-form.component';
import { ConfirmBoxService } from 'app/_services/confirm-box.service';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { TrainingCategoryService } from '../services/training-category.service';
import { TrainingSpecializationService } from '../services/training-specialization.service';

enum TABS {
  pending = 'pending', approved = 'approved', declined = 'declined'
}




type ModelType = MyTrainingPlan;
type FilterType = {};

@Component({
  selector: 'ngx-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent extends BaseComponent<ModelType, FilterType, ModelType> {
  filter: {} = {};
  data: ModelType[] = [];
  getData(): Observable<ListResult<ModelType>> {
    return this.api.list(this.filter);
  }
  saveData(e: ModelType): Observable<any> {
    return this.api.create(e);
  }
  getNewEditingData(): ModelType {
    return new MyTrainingPlan();
  }
  successMessage: string = 'Category saved successfully';
  deleteData(data: ModelType): Observable<any> {
    return this.api.delete(data.id);
  }
  
  tableColumns: TableColumn [] = [
    {name: 'trainingType', title: 'Type'},
    {name: 'specialiazation', title: 'Specialiazation'},
    {name: 'vendor', title: 'Vendor'},
    {name: 'budget', title: 'Budget'},
    {name: 'startDate', title: 'Start Date'},
    {name: 'endDate', title: 'End Date'},
    {name: 'status', title: 'Status'},
  ];

  pageTitle = 'Training Categories';
  requiredButton = [{name: 'newTraining', label: 'New Category', icon: 'plus'}];
  formConfig: FormConfig = {
    fields: [
      {name: 'name', label: 'Name', type: FORM_TYPES.text}
    ]
  };
  formTitle = 'Add new Category';
  constructor(
    protected confirmBox: ConfirmBoxService,
    protected alertService: AlertserviceService,
    private api: TrainingPlanService,
    ) {
      super(confirmBox);
  }

}
