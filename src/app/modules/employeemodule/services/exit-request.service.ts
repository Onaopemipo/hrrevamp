import { Injectable } from '@angular/core';
import { CrudService, ListResult } from 'app/_services/base-api.service';
import { random } from 'faker';
import { Observable, of, Subject } from 'rxjs';
import { extend } from 'validate.js';
import { Transfer } from '@flowjs/ngx-flow';
import * as fakerStatic from 'faker';

export class MyExitRequest {
  id?: number;
  fullName?: string;
  dateRequested?: string;
  endDate?: string;
  type?: string;
  status?: number;

  reason: string;
  subReason: string;
  sourceOfInitiation: string;
  exitDate: Date;
  uploadUnsupportingDocument: Transfer[];
  comment: string;

  constructor(obj: object ){
    Object.assign(this, obj);
  }
}

export class MyExitRequestFilter {
  PageSize?: number;
  id?: number;
  fullName?: string;
  dateRequested?: string;
  endDate?: string;
  type?: string;
  status?: number;
  PageNumber?: number
}
@Injectable({
  providedIn: 'root'
})
export class ExitRequestService extends CrudService<MyExitRequestFilter, MyExitRequest, MyExitRequest>{
  list(filter: MyExitRequestFilter): Observable<ListResult<MyExitRequest>> {
    // throw new Error('Method not implemented.');
    const subject = new Subject<ListResult<MyExitRequest>>();
    window.setTimeout(() => {
      const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      subject.next({
        data: data.map(id => new MyExitRequest({
          id: id,
          fullName: fakerStatic.name.firstName() + ' ' + fakerStatic.name.firstName(),
          dateRequested: fakerStatic.date.past(),
          endDate: fakerStatic.date.soon(),
          status: filter.status ? filter.status : 0,
          type: 'voluntary'
        })),
        length: 5
      });
      subject.complete();
    }, 2000);
    return subject.asObservable();
  }
  fetch(id: number) {
    throw new Error('Method not implemented.');
  }
  create(data: MyExitRequest) {
    return of();
  }
  delete(id: number) {
    return of();
  }

  // constructor() { }
}
