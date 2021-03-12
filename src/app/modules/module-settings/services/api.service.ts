import { Injectable } from '@angular/core';
import { IStatus, MyColor } from 'app/components/status/models';
import { Department, Location, SetUpsServiceProxy, VwDepartment } from 'app/_services/service-proxies';
import { Subject } from 'rxjs';

const PAGE_SIZE = 20;
export interface ListResult<T> {
  data: T[];
  length: number;
}

export class MyDepartment implements IStatus{
  department: Department;
  public constructor(department: Department){
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
    return new MyColor(200, 100, 10);
  }
  getStatusLabel() {
    return 'Active';
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

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  pageSize = PAGE_SIZE;

  constructor(
    private setup: SetUpsServiceProxy
  ) { }

  fetchAllEmployees(filter: DepartmentFilter) {
    const subject = new Subject<ListResult<any>>();
    this.setup.getAllDepartment(filter.page ? filter.page : 1, this.pageSize, 0, 0, 0, 0, 0, 0, 0).subscribe(data => {
      subject.next({
        data: data.result.map(department => new MyDepartment(department)),
        length: data.totalCount,
      });
      subject.complete();
    });
    return subject.asObservable();
  }

  fetchAllLocation(filter: LocationFilter) {
    const subject = new Subject<ListResult<any>>();
    this.setup.getAllLocations(filter.page ? filter.page : 1, this.pageSize, 0, 0, 0, 0, 0, 0, 0).subscribe(data => {
      subject.next({
        data: data.result.map(location => new MyLocation(location)),
        length: data.totalCount,
      });
      subject.complete();
    });
    return subject.asObservable();
  }

  fetchAllBenefits(){
  }
}
