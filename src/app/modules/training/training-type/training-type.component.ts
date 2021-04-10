import { TableColumn } from 'app/components/tablecomponent/models';
import { TopAction } from './../../../components/componentsheader/models';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { NbTabComponent } from '@nebular/theme';
import { BaseComponent } from 'app/components/base/base.component';
import { MyTrainingPlan, TrainingPlanService } from '../services/plan.service';
import { ListResult } from 'app/_services/base-api.service';
import { Observable } from 'rxjs';
import { FormConfig, FormField, FORM_TYPES } from 'app/components/custom-form/custom-form.component';
import { ConfirmBoxService } from 'app/_services/confirm-box.service';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { TrainingCategoryService } from '../services/training-category.service';
import { TrainingSpecializationService } from '../services/training-specialization.service';
import { MyTrainingType, TypesService } from '../services/types.service';
import { ChoiceName } from 'app/components/multi-select/multi-select.component';

enum TABS {
  pending = 'pending', approved = 'approved', declined = 'declined'
}

type ModelType = MyTrainingType;
type FilterType = MyTrainingType;

@Component({
  selector: 'ngx-training-type',
  templateUrl: './training-type.component.html',
  styleUrls: ['./training-type.component.scss']
})
export class TrainingTypeComponent  extends BaseComponent<ModelType, FilterType, ModelType> {
  filter = new MyTrainingType();
  data: ModelType[] = [];
  getData(): Observable<ListResult<ModelType>> {
    return this.api.list(this.filter);
  }
  saveData(e: ModelType): Observable<any> {
    const data = new MyTrainingType();
    Object.assign(data, e);
    return this.api.create(data);
  }
  getNewEditingData(): ModelType {
    return new MyTrainingType();
  }
  successMessage: string = 'Type saved successfully';
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

  pageTitle = 'Training Types';
  requiredButton = [{name: 'type', label: 'New Type', icon: 'plus'}];
  getFields(){
    return [
      {name: 'name', label: 'Title', type: FORM_TYPES.text},
      {name: 'trainingSpecializationId', label: 'Specialization', 
          type: FORM_TYPES.select,
          choice_name: ChoiceName.trainingSpecialization, singleSelection: true
      },
      {name: 'category', label: 'Category', type: FORM_TYPES.radio,
        selectOptions: [
          {selectValue: 1, selectLabel: 'Internal'},
          {selectValue: 2, selectLabel: 'External'},
        ]
      },
      {name: 'vendor_id', label: 'Vendor', type: FORM_TYPES.select,
        choice_name: ChoiceName.trainingType, singleSelection: true, hide: this.editingData.category === 1},
      {name: 'cost_per_head', label: 'Cost per head', type: FORM_TYPES.number},
      {name: 'number_of_trainees', label: 'No of Trainees', type: FORM_TYPES.number},
      {name: 'overall_budget_cost', label: 'Overall budget cost', type: FORM_TYPES.number},
      {name: 'content', label: 'Content', type: FORM_TYPES.file, hide: this.editingData.category === 2},
      {name: 'resource_person_id', label: 'Resource person', type: FORM_TYPES.employee, singleSelection: true, hide: this.editingData.category === 2},
    ]
  }
  formConfig: FormConfig = {
    fields: this.getFields(),
  };
  get formConfiga(): FormConfig {
    return {
      fields: [
        {name: 'name', label: 'Title', type: FORM_TYPES.text},
        {name: 'trainingSpecializationId', label: 'Specialization', 
            type: FORM_TYPES.select,
            choice_name: ChoiceName.trainingSpecialization, singleSelection: true
        },
        {name: 'category', label: 'Category', type: FORM_TYPES.radio,
          selectOptions: [
            {selectValue: 1, selectLabel: 'Internal'},
            {selectValue: 2, selectLabel: 'External'},
          ]
        },
        {name: 'vendor_id', label: 'Vendor', type: FORM_TYPES.select,
          choice_name: ChoiceName.trainingType, singleSelection: true, hide: this.editingData.category === 1},
        {name: 'cost_per_head', label: 'Cost per head', type: FORM_TYPES.number},
        {name: 'number_of_trainees', label: 'No of Trainees', type: FORM_TYPES.number},
        {name: 'overall_budget_cost', label: 'Overall budget cost', type: FORM_TYPES.number},
        {name: 'content', label: 'Content', type: FORM_TYPES.file, hide: this.editingData.category === 2},
        {name: 'resource_person_id', label: 'Resource person', type: FORM_TYPES.employee, singleSelection: true, hide: this.editingData.category === 2},
      ]
    };
  }

  formTitle = 'Add new Type';

  constructor(
    protected confirmBox: ConfirmBoxService,
    protected alertService: AlertserviceService,
    private api: TypesService,
    ) {
      super(confirmBox);
  }

}
