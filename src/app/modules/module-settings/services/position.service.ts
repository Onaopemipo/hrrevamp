import { Injectable } from '@angular/core';
import { IStatus, MyColor } from 'app/components/status/models';
import { AddUpdateLocationServiceProxy, GetAllLocationsServiceProxy, GetLocationByIdServiceProxy, LocationDTO, ManageLocationDTO, VwPosition } from 'app/_services/service-proxies';
import { of, Subject } from 'rxjs';
import { BaseFilter, CrudService, DEFAULT_PAGE_SIZE, ListResult } from './api.service';

export class MyPosition extends VwPosition implements IStatus {
  data: VwPosition;

  public constructor(data: VwPosition = new VwPosition()) {
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
    // return new ManageDepartmentDTO();
  }
}

export interface PositionFilter extends BaseFilter{
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
  ) { }

  list(filter: PositionFilter) {
    const subject = new Subject<ListResult<any>>();
    const positions = [new MyPosition()];
    subject.next({data: positions, length: 5});
    return subject.asObservable();
  }

  create(data: MyPosition) {
    return of({});
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
