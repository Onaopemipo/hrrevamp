import { Injectable } from '@angular/core';
import { IStatus, MyColor } from 'app/components/status/models';
import { Grade } from 'app/_services/service-proxies';
import { Subject } from 'rxjs';
import { BaseFilter, CrudService, DEFAULT_PAGE_SIZE, ListResult } from './api.service';

export class MySalaryGrade extends Grade implements IStatus {

  public constructor(salaryGrade: Grade = new Grade()) {
    super(salaryGrade);
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

  get no_of_steps() {
    return 4;
  }

  toManage() {
    // return new ManageDepartmentDTO();
  }
}

export interface SalaryGradeFilter extends BaseFilter{
  location_name?: string;
  state_id?: number;
  lga_id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class SalaryGradeService implements CrudService<SalaryGradeFilter, MySalaryGrade, MySalaryGrade>{

  pageSize = DEFAULT_PAGE_SIZE;
  constructor(
  ) { }

  list(filter: SalaryGradeFilter) {
    const subject = new Subject<ListResult<any>>();
    window.setTimeout(()=> {
      subject.next({data: [new MySalaryGrade()], length: 10});
    }, 2000);
    return subject.asObservable();
  }

  create(data: MySalaryGrade) {
    const subject = new Subject<any>();
    window.setTimeout(() => {
      subject.next();
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
