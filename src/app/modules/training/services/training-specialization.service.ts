import { Injectable } from '@angular/core';
import { IStatus, MyColor } from 'app/components/status/models';
import { CrudService, ListResult } from 'app/_services/base-api.service';
import { TrainingCategory, TrainingCategoryResource, TrainingServiceProxy, TrainingSpecialization } from 'app/_services/service-proxies';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class MyTrainingSpecialization extends TrainingSpecialization implements IStatus{
  constructor(data: TrainingSpecialization = new TrainingSpecialization()) {
    super(data);
  }
  getStatusLabel(): string {
    return this.is_Active ? 'Active' : 'InActive';
  }
  getStatusColor(): MyColor {
    return this.is_Active ? new MyColor(100, 100, 100) :  new MyColor(100, 100, 0);
  }
}

@Injectable({
  providedIn: 'root'
})
export class TrainingSpecializationService extends CrudService<MyTrainingSpecialization, {}, MyTrainingSpecialization>{
  list(filter: {}): Observable<ListResult<MyTrainingSpecialization>> {
    return this.trainingService.getTrainingSpecializations().pipe(map(res => {
      return {data: res.result.map(category => new MyTrainingSpecialization(category)), length: res.totalCount}
    }));
  }
  fetch(id: number) {
    throw new Error('Method not implemented.');
  }
  create(data: MyTrainingSpecialization) {
    return this.trainingService.addUpdateSpecialization(data);
  }
  delete(id: number) {
    return this.trainingService.deleteSpecialization(id);
  }

  constructor(
    private trainingService: TrainingServiceProxy
  ) {
    super();
  }


}
