import { Injectable } from '@angular/core';
import { IStatus, MyColor } from 'app/components/status/models';
import { AddUpdateLocationServiceProxy, GetAllLocationsServiceProxy, GetLocationByIdServiceProxy, LocationDTO, ManageLocationDTO } from 'app/_services/service-proxies';
import { Subject } from 'rxjs';
import { BaseFilter, CrudService, DEFAULT_PAGE_SIZE, ListResult } from './api.service';

export class MyLocation implements IStatus {
  location: LocationDTO;
  location_name: string;
  state: string;
  lga: string;
  lga_id: number;
  state_id: number;
  is_enabled: boolean;
  id: number;


  public constructor(location: LocationDTO = new LocationDTO()) {
    this.location = location;
    this.location_name = location.location_name;
    this.state = location.state;
    this.lga = location.lga;
    this.id = location.id;
    window.globalThis.aaa = this;
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

export interface LocationFilter extends BaseFilter{
  location_name?: string;
  state_id?: number;
  lga_id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class LocationService implements CrudService<LocationFilter, MyLocation, MyLocation>{

  pageSize = DEFAULT_PAGE_SIZE;
  constructor(
    private api_get: GetLocationByIdServiceProxy,
    private api_create: AddUpdateLocationServiceProxy,
    private api_list: GetAllLocationsServiceProxy,
  ) { }

  list(filter: LocationFilter) {
    const subject = new Subject<ListResult<any>>();
    this.api_list.getAllLocations(this.pageSize, filter.page ? filter.page : 1, filter.lga_id, filter.state_id).subscribe(data => {
      subject.next({
        data: data.result.map(location => new MyLocation(location)),
        length: data.totalCount,
      });
      subject.complete();
    });
    return subject.asObservable();
  }

  create(data: MyLocation) {
    return this.api_create.addUpdateLocation(new ManageLocationDTO(data));
  }

  init() {}
  toJSON() {}

  // fetch(id: number) {

  // }

  // delete(id: number) {
  //   return 
  // }

}
