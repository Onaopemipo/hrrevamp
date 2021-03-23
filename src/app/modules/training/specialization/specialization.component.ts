import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'app/components/base/base.component';
import { FormConfig, FORM_TYPES } from 'app/components/custom-form/custom-form.component';
import { ColumnTypes } from 'app/components/tablecomponent/models';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { CrudService, ListResult } from 'app/_services/base-api.service';
import { ConfirmBoxService } from 'app/_services/confirm-box.service';
import { TrainingSpecialization } from 'app/_services/service-proxies';
import { Observable } from 'rxjs';
import { MyTrainingSpecialization, TrainingSpecializationService } from '../services/training-specialization.service';

@Component({
  selector: 'ngx-specialization',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class SpecializationComponent extends BaseComponent<MyTrainingSpecialization, {}, MyTrainingSpecialization> {
  filter: {} = {};
  data: MyTrainingSpecialization[] = [];
  getData(): Observable<ListResult<MyTrainingSpecialization>> {
    return this.api.list(this.filter);
  }
  saveData(e: MyTrainingSpecialization): Observable<any> {
    return this.api.create(e);
  }
  getNewEditingData(): MyTrainingSpecialization {
    return new MyTrainingSpecialization();
  }
  successMessage: string = 'Specialization saved successfully';
  deleteData(data: MyTrainingSpecialization): Observable<any> {
    return this.api.delete(data.id);
  }

  tableColumns = [
    {name: 'name', title: 'Name'},
    {name: 'date_Created', title: 'Date Modified', type: ColumnTypes.Date},
    {name: 'name', title: 'Status', type: ColumnTypes.Status},
  ]
  pageTitle = 'Training Specialization';
  requiredButton = [{name: 'newTraining', label: 'New Specialization', icon: 'plus'}];
  formConfig: FormConfig = {
    fields: [
      {name: 'name', label: 'Name', type: FORM_TYPES.text}
    ]
  };
  formTitle = 'Add new Specialization';
  constructor(
    protected confirmBox: ConfirmBoxService,
    protected alertService: AlertserviceService,
    private api: TrainingSpecializationService,
    ) {
      super(confirmBox);
  }

}
