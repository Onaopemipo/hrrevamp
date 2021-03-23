import { Injectable } from '@angular/core';
import { CrudService, ListResult } from 'app/_services/base-api.service';
import { JobRole } from 'app/_services/service-proxies';
import { Observable } from 'rxjs';

export class MyJobRole extends JobRole{}
@Injectable({
  providedIn: 'root'
})
export class JobRoleService extends CrudService<MyJobRole, {}, MyJobRole>{
  list(filter: {}): Observable<ListResult<MyJobRole>> {
    throw new Error('Method not implemented.');
  }
  fetch(id: number): Observable<any> {
    throw new Error('Method not implemented.');
  }
  create(data: {}): Observable<any> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Observable<any> {
    throw new Error('Method not implemented.');
  }

  constructor(
    // private list_api: JobR
  ) {
    super();
  }
}
