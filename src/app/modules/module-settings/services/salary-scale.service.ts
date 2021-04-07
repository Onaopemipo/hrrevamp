import { Injectable } from '@angular/core';
import { IStatus, MyColor } from 'app/components/status/models';
import { SalaryScale, SalaryscaleServiceProxy } from 'app/_services/service-proxies';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
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
    private api: SalaryscaleServiceProxy
  ) { }

  list(filter: SalaryScaleFilter) {
    return this.api.getAllSalaryscale(10, filter.page).pipe(map(res => {
      return {
        data: res.result.map(scale => new MySalaryScale(scale)),
        length: res.totalCount
      };
    }));
  }

  create(data: MySalaryScale) {
    return this.api.addUpdateSalaryscale(data);
  }

  init() {}
  toJSON() {}

  // fetch(id: number) {

  // }

  // delete(id: number) {
  //   return 
  // }

}
