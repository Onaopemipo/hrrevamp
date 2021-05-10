import { KraAssignDTO } from './../../../_services/service-proxies';
import { Injectable } from '@angular/core';
import { CrudService, ListResult } from 'app/_services/base-api.service';
import { AssignKRAServiceProxy, CreateKeyResultAreaServiceProxy, FetchKeyResultAreaServiceProxy, FetchKeyResultAreasServiceProxy, ManageSectionDTO, SectionDTO } from 'app/_services/service-proxies';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class MyKeyResultArea extends SectionDTO {
  constructor(obj: SectionDTO = new SectionDTO()) {
    super(obj);
  }
  ratingTypeId: number;
  toManage() {
    return new ManageSectionDTO({
      id: this.id,
      name: this.section_name,
      score: this.maximum_score_obtainable,
      weight: this.weight,
      strategyCategoryId: this.strategyCategoryId,
      description: this.description,
      instructions: this.instructions,
      ratingTypeId: this.ratingTypeId
    });
  }
}
export class MyKeyResultAreaFilter{
  status?: number;
  ratingType?: number;
  startegyCategoryId?: number;
  pageNo?: number;
}
@Injectable({
  providedIn: 'root'
})
export class KeyResultAreaService extends CrudService<MyKeyResultAreaFilter, MyKeyResultArea, MyKeyResultArea>{
  list(filter: MyKeyResultAreaFilter): Observable<ListResult<MyKeyResultArea>> {
    return this.list_api.getKeyResultAreas(
      filter.status, filter.ratingType, filter.startegyCategoryId, 10, filter.pageNo ? filter.pageNo : 1).pipe(map(res => {
      return {
        data: res.result.map(obj => new MyKeyResultArea(obj)),
        length: res.totalCount
      };
    }));
  }
  fetch(id: number): Observable<MyKeyResultArea> {
    return this.fetch_api.getKeyResultArea(id).pipe(map(res => new MyKeyResultArea(res.result)));
  }
  create(data: MyKeyResultArea) {
    return this.create_api.createKeyResultArea(data.toManage());
  }
  delete(id: number) {
    throw new Error('Method not implemented.');
  }

  assignObj(cycle_id: number, kras: string, employees) {
    const obj = new KraAssignDTO({
      cycleId: cycle_id,
      selectedKraReviewers: kras,
      // krAs: String(kra.id),
      // reviewerId: reviewerId,
      employeeContractIds: employees,
    });
    return this.assign_api.assignKRA(obj);
  }

  constructor(
    private create_api: CreateKeyResultAreaServiceProxy,
    private list_api: FetchKeyResultAreasServiceProxy,
    private fetch_api: FetchKeyResultAreaServiceProxy,
    private assign_api: AssignKRAServiceProxy,
  ) {
    super();
  }
}
