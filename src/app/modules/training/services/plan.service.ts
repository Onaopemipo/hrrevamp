import { Injectable } from '@angular/core';
import { Transfer } from '@flowjs/ngx-flow';
import { CrudService, ListResult } from 'app/_services/base-api.service';
import {  TrainingDTO, TrainingServiceProxy } from 'app/_services/service-proxies';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { transferToFile } from './types.service';

export class MyTrainingPlan extends TrainingDTO{
  selectedEmployees: string;
  attachment: Transfer;
  constructor(plan = new TrainingDTO()) {
    super(plan);
  }
  toManage() {
    return {};
  }

  static fromForm(form: object){
    const obj = new MyTrainingPlan();
    obj.name = form['name'];
    obj.trainingTypeId = form['type'];
    obj.specializationId = form['specialization'];
    obj.vendorId = form['vendor'];
    obj.startDate = form['date_range'].start;
    obj.endDate = form['date_range'].end;
    obj.description = form['description'];
    obj.selectedEmployees = form['beneficiaries'];
    obj.costPerEmployee = form['costPerEmployee'];
    obj.totalCost = form['totalCost'];
    obj.attachment = form['attachment'];
    return obj;
  }
}
export class ITrainingFilterDTO {
  pageNumber = 1;
  pageSize = 10;
  specializationId = 0;
  trainingTypeId = 0;
  vendorId = 0;
  startDate = null;
  endDate = null;
  totalCost = 0;
  costPerEmployee = 0;
}
@Injectable({
  providedIn: 'root'
})
export class TrainingPlanService extends CrudService<ITrainingFilterDTO, MyTrainingPlan, MyTrainingPlan> {
  list(filter: ITrainingFilterDTO): Observable<ListResult<MyTrainingPlan>> {
    return this.api.getAllTrainingPlans(
      filter.pageSize, filter.pageNumber, filter.trainingTypeId, filter.specializationId, filter.vendorId,
      filter.startDate, filter.endDate, filter.totalCost, filter.costPerEmployee
    ).pipe(map(res => {
      return {
        data: res.result.map(data => new MyTrainingPlan(data)),
        length: res.totalCount,
      };
    }));
  }
  fetch(id: number) {
    throw new Error('Method not implemented.');
  }
  create(data: MyTrainingPlan) {
    return this.api.addUpdateTrainingPlan(data.id ? data.id : 0, data.name, data.description, true, data.startDate, data.endDate,
      data.trainingTypeId, data.specializationId,
      data.vendorId, data.totalCost, data.costPerEmployee, data.selectedEmployees, "");
  }
  delete(id: number) {
    return this.api.deleteTrainingPlan(id);
  }

  constructor(
    private api: TrainingServiceProxy,
  ) {
    super();
  }
}
