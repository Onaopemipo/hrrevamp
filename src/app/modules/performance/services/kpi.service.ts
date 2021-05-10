import { Injectable } from '@angular/core';
import { CrudService, ListResult } from 'app/_services/base-api.service';
import { AddUpdateKPIServiceProxy, FetchKPIServiceProxy, FetchKPIsServiceProxy, KPI, KpiDTO, ManageKpiDTO } from 'app/_services/service-proxies';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class MyKPI extends KpiDTO {
  public kra_id: number;
  ratingTypeId = 1;
  constructor(kra_id = 1, data = new KpiDTO()) {
    super(data);
    this.kra_id = kra_id;
  }
  toManage() {
   return new ManageKpiDTO(this);
  }
}
export class MyKPIFilter {
  kra_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class KpiService extends CrudService<MyKPIFilter, MyKPI, MyKPI> {
  fetch(id: number) {
    throw new Error('Method not implemented.');
  }
  list(filter: MyKPIFilter): Observable<ListResult<MyKPI>> {
    return this.list_api.getKPIs(filter.kra_id).pipe(map(res => {
      return {
        data: res.result.map(kpi => new MyKPI(filter.kra_id, kpi)),
        length: res.totalCount,
      };
    }));
  }
  create(data: MyKPI) {
   return this.create_api.addUpdateKPI(data.toManage());
  }
  delete(id: number) {
    throw new Error('Method not implemented.');
  }

  constructor(
    private create_api: AddUpdateKPIServiceProxy,
    private list_api: FetchKPIsServiceProxy,
  ) {
    super();
  }

}
