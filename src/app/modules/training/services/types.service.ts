import { Injectable } from '@angular/core';
import { Transfer } from '@flowjs/ngx-flow';
import { CrudService, ListResult } from 'app/_services/base-api.service';
import { TrainingServiceProxy, TrainingType, TrainingTypePayload, TrainingTypeResource, TrainingTypeResourceListApiResult } from 'app/_services/service-proxies';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class MyTrainingType extends TrainingTypeResource {
  cost_per_head: number;
  number_of_trainees: number;
  overall_budget_cost: number;
  content: Transfer[];
  resource_person_id: number;
  vendor_id: number;
  category: number;
  constructor(obj = new TrainingTypeResource()) {
    super(obj);
  }

  toManage() {
  return new TrainingTypePayload();
  }
}
@Injectable({
  providedIn: 'root'
})
export class TypesService extends CrudService<MyTrainingType, {}, MyTrainingType>{
  list(filter: MyTrainingType): Observable<ListResult<MyTrainingType>> {
    return this.api.types(filter.name, filter.trainingVendorId, filter.trainingSpecializationId, filter.trainingCategoryId)
      .pipe(map(res => {
        return {
          data: res.result.map(data => new MyTrainingType(data)),
          length: res.totalCount,
        };
      }));
  }
  fetch(id: number) {
    throw new Error('Method not implemented.');
  }
  create(data: MyTrainingType) {
    return this.api.createtype(data.toManage());
  }
  delete(id: number) {
    return this.api.deleteTrainingType(id);
  }

  constructor(
    private api: TrainingServiceProxy,
  ) {
    super();
  }
}
