import { Injectable } from '@angular/core';
import { IStatus, MyColor } from 'app/components/status/models';
import { Grade, GradeLevelServiceProxy } from 'app/_services/service-proxies';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
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
  promotion_min_years?: number;
  promotion_min_days?: number;
  lga_id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class SalaryGradeService implements CrudService<SalaryGradeFilter, MySalaryGrade, MySalaryGrade>{

  pageSize = DEFAULT_PAGE_SIZE;
  constructor(
    private api: GradeLevelServiceProxy,
  ) { }

  list(filter: SalaryGradeFilter) {
    return this.api.getAllGradeLevel(10, filter.page, 
      filter.promotion_min_years, filter.promotion_min_days).pipe(map(res => {
      return {
        data: res.result.map(grade => new MySalaryGrade(grade)),
        length: res.totalRecord,
      };
    }));
    const subject = new Subject<ListResult<any>>();
    window.setTimeout(()=> {
      subject.next({data: [new MySalaryGrade()], length: 10});
    }, 2000);
    return subject.asObservable();
  }

  create(data: MySalaryGrade) {
    return this.api.addUpdateGradeLevel(data);
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
