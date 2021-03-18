import { Injectable } from '@angular/core';
import { IStatus, MyColor } from 'app/components/status/models';
import { AddUpdateDepartmentServiceProxy, Department, GetDepartmentByIdServiceProxy, Location, ManageDepartmentDTO, } from 'app/_services/service-proxies';
import {  DepartmentDTO, GetAllDepartmentsServiceProxy } from 'app/_services/service-proxies';
import { Observable, Subject } from 'rxjs';

const PAGE_SIZE = 20;
export interface ListResult<T> {
  data: T[];
  length: number;
}

export class MyDepartment implements IStatus{
  department: DepartmentDTO;
  name: string;
  code: string;
  id: number;


  public constructor(department: DepartmentDTO = new DepartmentDTO()) {
    this.department = department;
    this.name = department.name;
    this.code = department.code;
    this.id = department.id;
    window.globalThis.aaa = this;
  }

  // get id() {
  //   console.log(1111);
  //   return this.department.id;
  // }

  getStatusColor() {
    return new MyColor(200, 100, 10);
  }
  getStatusLabel() {
    return 'Active';
  }

  toManage() {
    return new ManageDepartmentDTO();
  }
}

export class MyLocation implements IStatus {
  public location: Location;
  public constructor(location: Location) {
    this.location = location;
  }

  get id() {
    return 1;
  }

  getStatusColor() {
    return new MyColor(11, 11, 11);
  }

  getStatusLabel() {
    return 'Active';
  }
}

// export class MyPosition {
//   public position: 
// }

export interface DepartmentFilter {
  name?: string;
  code?: string;
  page?: number;
}

export interface LocationFilter {
  name?: string;
  code?: string;
  page?: number;
}

abstract class CrudService<Filter, Create, Data> {
  abstract list(filter: Filter): Observable<ListResult<Data>>;
  // abstract fetch(id: number);
  // abstract create(data: Create);
  // abstract update(id: number, data: Create);
  // abstract delete(id: number);
}

@Injectable({
  providedIn: 'root'
})
export class ApiService implements CrudService<DepartmentFilter, MyDepartment, MyDepartment>{
  pageSize = PAGE_SIZE;

  constructor(
    private getDepartmentService: GetDepartmentByIdServiceProxy,
    private createDepartmentService: AddUpdateDepartmentServiceProxy,
    private listDepartmentService: GetAllDepartmentsServiceProxy,
  ) { }

  list(filter: DepartmentFilter) {
    const subject = new Subject<ListResult<any>>();
    this.listDepartmentService.getAllDepartments(this.pageSize, filter.page ? filter.page : 1).subscribe(data => {
      subject.next({
        data: data.result.map(department => new MyDepartment(department)),
        length: data.totalCount,
      });
      subject.complete();
    });
    return subject.asObservable();
  }

  create(data: MyDepartment) {
    return this.createDepartmentService.addUpdateDepartment(new ManageDepartmentDTO(data));
  }

  init() {}
  toJSON() {}

  // fetch(id: number) {

  // }

  // delete(id: number) {
  //   return 
  // }

}
