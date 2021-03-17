import { Injectable } from '@angular/core';
import { IStatus, MyColor } from 'app/components/status/models';
import {  DepartmentDTO, GetAllDepartmentsServiceProxy } from 'app/_services/service-proxies';
import { Subject } from 'rxjs';

const PAGE_SIZE = 20;
export interface ListResult<T> {
  data: T[];
  length: number;
}

export class MyDepartment implements IStatus{
  department: DepartmentDTO;
  public constructor(department: DepartmentDTO){
    this.department = department;
  }

  get name() {
    return this.department.name;
  }

  get code() {
    return this.department.code;
  }

  get id() {
    return this.department.id;
  }

  getStatusColor() {
    return new MyColor(200, 100, 10)
  }
  getStatusLabel(){
    return 'Active';
  }
}

export interface DepartmentFilter {
  name?: string;
  code?: string;
  page?: number;
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  pageSize = PAGE_SIZE;

  constructor(
    private setup: GetAllDepartmentsServiceProxy
  ) { }

  fetchAllEmployees(filter: DepartmentFilter) {
    const subject = new Subject<ListResult<any>>();
    this.setup.getAllDepartments(this.pageSize,filter.page ? filter.page : 1).subscribe(data => {
      subject.next({
        data: data.result.map(department => new MyDepartment(department)),
        length: data.totalCount,
      });
      subject.complete();
    });
    return subject.asObservable();
  }
}
