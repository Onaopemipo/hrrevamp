import { Injectable } from '@angular/core';
import { IStatus, MyColor } from 'app/components/status/models';
import { AddUpdatePositionServiceProxy, GetAllPositionsServiceProxy, ManagePositionDTO, Position, PositionDTO } from 'app/_services/service-proxies';
import { of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseFilter, CrudService, DEFAULT_PAGE_SIZE, ListResult } from './api.service';

export class MyPosition extends PositionDTO implements IStatus {
  data: PositionDTO;
  selectedQualifications: string;
  selectedCertifications: string;

  public constructor(data: PositionDTO = new PositionDTO()) {
    super(data);
    this.data = data;
    Object.assign(this, data);
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
    return new ManagePositionDTO({...this, selectedQualifications: this.selectedQualifications,
      selectedCertifications: this.selectedCertifications });
  }
}

export interface PositionFilter extends BaseFilter {
  title?: string;
  description?: number;
  min_no_of_years_for_promotion?: number;
  min_no_of_years_of_experience_for_position?: number;
  min_salary?: number;
  parent_position?: number;
  next_position?: number;
}

@Injectable({
  providedIn: 'root'
})
export class PositionService implements CrudService<PositionFilter, MyPosition, MyPosition>{

  pageSize = DEFAULT_PAGE_SIZE;
  constructor(
    private list_api: GetAllPositionsServiceProxy,
    private creare_api: AddUpdatePositionServiceProxy,
  ) { }

  list(filter: PositionFilter) {
    return this.list_api.getAllPositions(10, filter.page,
      filter.parent_position, filter.next_position, filter.min_salary).pipe(
      map(res => {
        return {data: res.result.map(pos => new MyPosition(pos)), length: res.totalCount};
      })
    );
  }

  create(data: MyPosition) {
    return this.creare_api.addUpdatePosition(data.toManage());
    // return this.api_create.addUpdateLocation(new ManageLocationDTO(data));
  }

  init() {}
  toJSON() {}

  // fetch(id: number) {

  // }

  // delete(id: number) {
  //   return 
  // }

}
