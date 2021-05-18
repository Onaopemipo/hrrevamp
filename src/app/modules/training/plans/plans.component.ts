import { TableColumn } from 'app/components/tablecomponent/models';
import { TopAction } from './../../../components/componentsheader/models';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { NbTabComponent } from '@nebular/theme';
import { BaseComponent } from 'app/components/base/base.component';
import { ITrainingFilterDTO, MyTrainingPlan, TrainingPlanService } from '../services/plan.service';
import { ListResult } from 'app/_services/base-api.service';
import { Observable } from 'rxjs';
import { FormConfig, FORM_TYPES } from 'app/components/custom-form/custom-form.component';
import { ConfirmBoxService } from 'app/_services/confirm-box.service';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { TrainingCategoryService } from '../services/training-category.service';
import { TrainingSpecializationService } from '../services/training-specialization.service';
import { EmptyConfig } from 'app/components/page/page.component';
import { ChoiceName } from 'app/components/multi-select/multi-select.component';
import { DataServiceProxy } from 'app/_services/service-proxies';

enum TABS {
  pending = 'pending', approved = 'approved', declined = 'declined'
}




type ModelType = MyTrainingPlan;
type FilterType = ITrainingFilterDTO;

@Component({
  selector: 'ngx-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent extends BaseComponent<ModelType, FilterType, ModelType> {
  filter: ITrainingFilterDTO = new ITrainingFilterDTO();
  data: ModelType[] = [];
  getData(): Observable<ListResult<ModelType>> {
    return this.api.list(this.filter);
  }
  saveData(e: ModelType): Observable<any> {
    const data = MyTrainingPlan.fromForm(e);
    let newdata: any = '';
    return this.api.create(data);
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

  pageTitle = 'Training Plan';
  requiredButton = [{name: 'newTraining', label: 'New Plan', icon: 'plus'}];
  formConfig: FormConfig = {
    fields: [
      {name: 'name', label: 'Name', type: FORM_TYPES.text},
      {name: 'type', label: 'Training Type',
        type: FORM_TYPES.select, singleSelection: true,
        choice_name: ChoiceName.trainingType},
      {name: 'specialization', label: 'Training Specialization',
        type: FORM_TYPES.select, singleSelection: true,
        choice_name: ChoiceName.trainingSpecialization},
      {name: 'vendor', label: 'Training Vendor',
        type: FORM_TYPES.select, singleSelection: true,
        choice_name: ChoiceName.trainingVendor},
      {name: 'date_range', label: 'Date Range', type: FORM_TYPES.date_range},
      {name: 'description', label: 'Description', type: FORM_TYPES.wysiwyg},
      {name: 'costPerEmployee', label: 'Cost per employee', type: FORM_TYPES.amount},
      {name: 'totalCost', label: 'Total Cost', type: FORM_TYPES.amount},
      {name: 'attachment', label: 'Attachment', type: FORM_TYPES.file},
      {name: 'beneficiaries', label: 'Beneficiary', type: FORM_TYPES.employee},
    ]
  };
  formTitle = 'Add new Plan';
  emptyConfig: EmptyConfig = {
    pageHeader: 'Create your first plan',
    pageDescription: 'Click on the button to create a plan',
    buttonValue: 'Create New',
  };
  constructor(
    protected confirmBox: ConfirmBoxService,
    protected alertService: AlertserviceService,
    private api: TrainingPlanService,
    protected dataService: DataServiceProxy
    ) {
      super(confirmBox);
  }

}
