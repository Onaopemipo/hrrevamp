import { Injectable } from '@angular/core';
import { CrudService, ListResult } from 'app/_services/base-api.service';
import { TrainingType, TrainingTypeResourceListApiResult } from 'app/_services/service-proxies';
import { Observable } from 'rxjs';

export class MyTrainingType extends TrainingType{

}
@Injectable({
  providedIn: 'root'
})
export class TypesService extends CrudService<MyTrainingType, {}, MyTrainingType>{
  list(filter: MyTrainingType): Observable<ListResult<MyTrainingType>> {
    throw new Error('Method not implemented.');
  }
  fetch(id: number) {
    throw new Error('Method not implemented.');
  }
  create(data: {}) {
    throw new Error('Method not implemented.');
  }
  delete(id: number) {
    throw new Error('Method not implemented.');
  }

  constructor() {
    super();
  }
}
