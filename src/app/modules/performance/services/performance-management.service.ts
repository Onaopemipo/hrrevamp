import { Injectable } from '@angular/core';
import { CrudService, ListResult } from 'app/_services/base-api.service';
import { AddUpdatePerformanceCycleServiceProxy, CycleDTO, FetchPerformanceCyclesServiceProxy, ManageCycleDTO } from 'app/_services/service-proxies';
import { database } from 'faker';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
 
export class MyPerformanceCycle extends CycleDTO {
  instructions: string;
  constructor(data: CycleDTO = new CycleDTO()) {
    super(data);
  }

  toManage(){
    return new ManageCycleDTO(this);
  }
}
@Injectable({
  providedIn: 'root'
})
export class PerformanceManagementService extends CrudService<MyPerformanceCycle, MyPerformanceCycle, MyPerformanceCycle> {
  list(filter: MyPerformanceCycle): Observable<ListResult<MyPerformanceCycle>> {
    return this.list_api.getPerformanceCycles(0, 0, 0, 0, 0, 10).pipe(map(res => {
      return {
        data: res.result.map(data => new MyPerformanceCycle(data)),
        length: res.totalCount,
      }
    }))
  }
  fetch(id: number) {
    throw new Error('Method not implemented.');
  }
  create(data: MyPerformanceCycle) {
    return this.create_api.addUpdatePerformanceCycle(data.toManage());
  }
  delete(id: number) {
    throw new Error('Method not implemented.');
  }


  constructor(
    private list_api: FetchPerformanceCyclesServiceProxy,
    private create_api: AddUpdatePerformanceCycleServiceProxy,
  ) { 
    super();
  }
}
