import { Injectable } from '@angular/core';
import { CrudService, ListResult } from 'app/_services/base-api.service';
import {  TrainingDTO, TrainingServiceProxy } from 'app/_services/service-proxies';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class MyTrainingPlan extends TrainingDTO{
  selectedEmployees: string;
  constructor(plan = new TrainingDTO()) {
    super(plan);
  }
  // toManage() {
  //   return new ManageTrainingDTO({
  //     id: this.id,
  //     name: this.name,
  //     description: this.description,
  //     selectedEmployees: this.selectedEmployees,
  //     trainingTypeId: this.trainingTypeId,
  //     status: true,
  //     startDate: this.startDate,
  //     endDate: this.endDate,
  //     specializationId: this.specializationId,
  //     vendorId: this.vendorId,
  //     totalCost: this.totalCost,
  //     costPerEmployee: this.costPerEmployee,
  //     attachment: '',
  //   });
  // }

  static fromForm(form: object){
    const obj = new MyTrainingPlan();
    obj.trainingTypeId = form['type'];
    obj.startDate = form['range'].start;
    obj.endDate = form['date_range'].end;
    obj.description = form['description'];
    obj.selectedEmployees = form['beneficiaries'];
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
    return true//this.api.addUpdateTrainingPlan(data.toManage());
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
