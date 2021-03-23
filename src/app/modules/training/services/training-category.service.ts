import { Injectable } from '@angular/core';
import { IStatus, MyColor } from 'app/components/status/models';
import { CrudService, ListResult } from 'app/_services/base-api.service';
import { TrainingCategory, TrainingCategoryResource, TrainingServiceProxy } from 'app/_services/service-proxies';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class MyTrainingCategory extends TrainingCategoryResource implements IStatus{
  constructor(category: TrainingCategoryResource = new TrainingCategoryResource()) {
    super(category);
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
export class TrainingCategoryService extends CrudService<MyTrainingCategory, {}, MyTrainingCategory>{
  list(filter: {}): Observable<ListResult<MyTrainingCategory>> {
    return this.trainingService.categories().pipe(map(res => {
      return {data: res.result.map(category => new MyTrainingCategory(category)), length: res.totalCount}
    }));
  }
  fetch(id: number) {
    throw new Error('Method not implemented.');
  }
  create(data: MyTrainingCategory) {
    return this.trainingService.createorupdatecategory(data);
  }
  delete(id: number) {
    return this.trainingService.deleteCategory(id);
  }

  constructor(
    private trainingService: TrainingServiceProxy
  ) {
    super();
  }


}
