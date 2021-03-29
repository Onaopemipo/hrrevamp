import { Injectable } from '@angular/core';
import { CrudService, ListResult } from 'app/_services/base-api.service';
import { TrainingServiceProxy } from 'app/_services/service-proxies';
import { Observable } from 'rxjs';

export class MyTrainingPlan {}

@Injectable({
  providedIn: 'root'
})
export class TrainingPlanService extends CrudService<MyTrainingPlan, MyTrainingPlan, MyTrainingPlan> {
  list(filter: MyTrainingPlan): Observable<ListResult<MyTrainingPlan>> {
    throw new Error('Method not implemented.');
  }
  fetch(id: number) {
    throw new Error('Method not implemented.');
  }
  create(data: MyTrainingPlan) {
    throw new Error('Method not implemented.');
  }
  delete(id: number) {
    throw new Error('Method not implemented.');
  }

  constructor(
    private api: TrainingServiceProxy,
  ) {
    super();
  }
}
