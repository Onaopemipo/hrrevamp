import { Injectable } from '@angular/core';
import { IStatus, MyColor } from 'app/components/status/models';
import { SalaryScale } from 'app/_services/service-proxies';
import { Subject } from 'rxjs';
import { BaseFilter, CrudService, DEFAULT_PAGE_SIZE, ListResult } from './api.service';

export class MySalaryScale extends SalaryScale implements IStatus {

  public constructor(salaryScale: SalaryScale = new SalaryScale()) {
    super(salaryScale);
  }

  getStatusColor() {
    return new MyColor(200, 100, 10);
  }
  getStatusLabel() {
    return 'Active';
  }

  toManage() {
    // return new ManageDepartmentDTO();
  }
}

export interface SalaryScaleFilter extends BaseFilter{
  location_name?: string;
  state_id?: number;
  lga_id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class SalaryScaleService implements CrudService<SalaryScaleFilter, MySalaryScale, MySalaryScale>{

  pageSize = DEFAULT_PAGE_SIZE;
  constructor(
  ) { }

  list(filter: SalaryScaleFilter) {
    const subject = new Subject<ListResult<any>>();
    window.setTimeout(() => {
      subject.next({data: [new MySalaryScale()], length: 10});
    }, 2000);
    return subject.asObservable();
  }

  create(data: MySalaryScale) {
    const subject = new Subject<any>();
    window.setTimeout(() => {
      subject.next({});
      subject.complete();
    }, 2000);
    return subject.asObservable();
  }

  init() {}
  toJSON() {}

  // fetch(id: number) {

  // }

  // delete(id: number) {
  //   return 
  // }

}
