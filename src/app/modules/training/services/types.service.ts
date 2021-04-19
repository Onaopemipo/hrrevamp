import { Injectable } from '@angular/core';
import { Transfer } from '@flowjs/ngx-flow';
import { CrudService, ListResult } from 'app/_services/base-api.service';
import { TrainingServiceProxy, TrainingType, TrainingTypeResource, TrainingTypeResourceListApiResult } from 'app/_services/service-proxies';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { fileURLToPath } from 'url';

export class MyTrainingType extends TrainingTypeResource {
  cost_per_head: number;
  number_of_trainees: number;
  overall_budget_cost: number;
  content: Transfer;
  resource_person_id: number;
  vendor_id: number;
  category: number;
  constructor(obj = new TrainingTypeResource()) {
    super(obj);
  }

  toManage() {
    throw new Error('Method not implemented.');
  }

  get selectValue() {
    return this.id;
  }

  get selectLabel() {
    return this.name;
  }
}

export const transferToFile = (file: Transfer) => {
  return {data: file.flowFile.file, fileName: file.flowFile.name};
};
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
    return this.api.createtype(data.cost_per_head, data.number_of_trainees, data.overall_budget_cost, 0, data.resource_person_id, data.trainingVendorId,
      data.trainingSpecializationId, data.name, transferToFile(data.content), data.trainingCategoryId);
    // return this.api.createtype(data.cost_per_head, data.number_of_trainees, data.overall_budget_cost, 0, data.employeeId, data.trainingVendorId,
    //   data.trainingSpecializationId, data.name, null, data.trainingCategoryId);
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
