import { Injectable } from '@angular/core';
import { IStatus, MyColor } from 'app/components/status/models';
import { Grade, VwGradeSteps } from 'app/_services/service-proxies';
import { Subject } from 'rxjs';
import { BaseFilter, CrudService, DEFAULT_PAGE_SIZE, ListResult } from './api.service';

export class MyGradeStep extends VwGradeSteps implements IStatus {

  public constructor(salaryGrade: VwGradeSteps = new VwGradeSteps()) {
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

  toManage() {
    // return new ManageDepartmentDTO();
  }
}

export interface GradeStepFilter extends BaseFilter{
  location_name?: string;
  state_id?: number;
  lga_id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class GradeStepService implements CrudService<GradeStepFilter, MyGradeStep, MyGradeStep>{

  pageSize = DEFAULT_PAGE_SIZE;
  constructor(
  ) { }

  list(filter: GradeStepFilter) {
    const subject = new Subject<ListResult<any>>();
    window.setTimeout(()=> {
      subject.next({data: [new MyGradeStep()], length: 10});
    }, 2000);
    return subject.asObservable();
  }

  create(data: MyGradeStep) {
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
