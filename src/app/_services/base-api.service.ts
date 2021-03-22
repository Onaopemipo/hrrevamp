import { Injectable } from '@angular/core';
import { IStatus, MyColor } from 'app/components/status/models';
import { Observable, Subject } from 'rxjs';

export const DEFAULT_PAGE_SIZE = 20;

export interface BaseFilter{
  page?: number;
}
export interface ListResult<T> {
  data: T[];
  length: number;
}

export class MyModel implements IStatus{

  public constructor() {
  }

  getStatusColor() {
    return new MyColor(200, 100, 10);
  }
  getStatusLabel() {
    return 'Active';
  }

  toManage() {
    return {};
  }
}


export interface DepartmentFilter {
  name?: string;
  code?: string;
  page?: number;
}

export abstract class CrudService<Filter, Create, Data> {
  abstract list(filter: Filter): Observable<ListResult<Data>>;
  abstract fetch(id: number);
  abstract create(data: Create);
//   abstract update(id: number, data: Create);
  abstract delete(id: number);
}
