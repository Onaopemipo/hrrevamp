import { Injectable } from '@angular/core';
import { IStatus, MyColor } from 'app/components/status/models';
import { Grade, GradeLevelStepServiceProxy, GradestepCreatePayload, GradestepDTO } from 'app/_services/service-proxies';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseFilter, CrudService, DEFAULT_PAGE_SIZE, ListResult } from './api.service';

export class MyGradeStep extends GradestepDTO implements IStatus {

  public constructor(salaryGrade: GradestepDTO = new GradestepDTO()) {
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
    return new GradestepCreatePayload({
      id: this.id,
      grade_id: this.grade_id,
      step_no: this.step_no,
      gradeName: '',
      stepName: this.name
    });
  }
}

export interface GradeStepFilter extends BaseFilter{
  grade_name?: boolean;
  step_name?: boolean;
  grade_id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class GradeStepService implements CrudService<GradeStepFilter, MyGradeStep, MyGradeStep>{

  pageSize = DEFAULT_PAGE_SIZE;
  constructor(
    private api: GradeLevelStepServiceProxy,
  ) { }

  list(filter: GradeStepFilter) {
    return this.api.getAllGradeLevelSteps(filter.grade_name, filter.step_name, 10, filter.page, 0).pipe(map(res => {
      return {
        data: res.result.map(grade => new MyGradeStep(grade)),
        length: res.totalRecord,
      };
    }));
  }

  create(data: MyGradeStep) {
    return this.api.addUpdateGradeLevelStep(data.toManage());
  }

  init() {}
  toJSON() {}

  // fetch(id: number) {

  // }

  // delete(id: number) {
  //   return 
  // }

}
