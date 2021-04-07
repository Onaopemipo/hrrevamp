import { Injectable } from '@angular/core';
import { CrudService, ListResult } from 'app/_services/base-api.service';
import { DepartmentDTO, GetAllDepartmentsServiceProxy } from 'app/_services/service-proxies';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class MyDepartment extends DepartmentDTO{
  constructor(data: DepartmentDTO) {
    super(data);
  }

  get selectValue() {
    return this.id;
  }

  get selectLabel() {
    return this.name;
  }
}

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService extends CrudService<MyDepartment, MyDepartment, MyDepartment>{
  list(filter: MyDepartment): Observable<ListResult<MyDepartment>> {
    return this.list_api.getAllDepartments(10, 1).pipe(map(res => {
      return {
        data: res.result.map(data => new MyDepartment(data)),
        length: res.totalCount,
      }
    }))
  }
  fetch(id: number) {
    throw new Error('Method not implemented.');
  }
  create(data: MyDepartment) {
    throw new Error('Method not implemented.');
  }
  delete(id: number) {
    throw new Error('Method not implemented.');
  }

  constructor(
    private list_api: GetAllDepartmentsServiceProxy,
  ) {
    super();
  }
}
