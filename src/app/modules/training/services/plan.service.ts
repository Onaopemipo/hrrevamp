import { Injectable } from '@angular/core';
import { CrudService, ListResult } from 'app/_services/base-api.service';
import { ManageTrainingDTO, TrainingDTO, ITrainingFilterDTO, TrainingServiceProxy, TrainingFilterDTO } from 'app/_services/service-proxies';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class MyTrainingPlan extends TrainingDTO{
  constructor(plan = new TrainingDTO()) {
    super(plan);
  }
  toManage() {
    return new ManageTrainingDTO();
  }
}
@Injectable({
  providedIn: 'root'
})
export class TrainingPlanService extends CrudService<MyTrainingPlan, MyTrainingPlan, MyTrainingPlan> {
  list(filter): Observable<ListResult<MyTrainingPlan>> {
    const _filter: ITrainingFilterDTO = {
      pageNumber: 1,
      pageSize: 10,
      specializationId: 0,
      trainingTypeId: 0,
      vendorId: 0,
      startDate: null,
      endDate: null,
      totalCost: 0,
      costPerEmployee: 0,
    };
    const filterObj = new TrainingFilterDTO(_filter);
    return this.api.getAllTrainingPlans(filterObj).pipe(map(res => {
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
    return this.api.addUpdateTrainingPlan(data.toManage());
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
