import { Injectable } from '@angular/core';
import { IStatus, MyColor } from 'app/components/status/models';
import { AddUpdateLocationServiceProxy, GetAllLocationsServiceProxy, GetLocationByIdServiceProxy, IMessageOut, LocationDTO, ManageLocationDTO } from 'app/_services/service-proxies';
import { of, Subject } from 'rxjs';
import { BaseFilter, CrudService, DEFAULT_PAGE_SIZE, ListResult } from './api.service';

export class MyGeneric implements IStatus {
  generic: LocationDTO;
  Sn: number
  Name: string;
  isActive: boolean;
  DateCreated: Date = new Date()
  id: number;


  public constructor(generic = {}) {
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

export interface GenericFilter extends BaseFilter {
  DropdownName?: string;
  isActive?: boolean;
  DateCreated?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class GenericService implements CrudService<GenericFilter, MyGeneric, MyGeneric>{

  pageSize = DEFAULT_PAGE_SIZE;
  constructor(
    private api_get: GetLocationByIdServiceProxy,
    private api_create: AddUpdateLocationServiceProxy,
    private api_list: GetAllLocationsServiceProxy,
  ) { }

  list(filter: GenericFilter) {
    const subject = new Subject<ListResult<any>>();
    // this.api_list.getAllLocations(this.pageSize, filter.page ? filter.page : 1, filter.lga_id, filter.state_id).subscribe(data => {
    //   subject.next({
    //     data: data.result.map(location => new MyEvent(location)),
    //     length: data.totalCount,
    //   });
    //   subject.complete();
    // });
    window.setTimeout(() => {
      subject.next({
        data: [
          new MyGeneric(), new MyGeneric()
        ], length: 10
      })
      subject.complete()
    }, 1000)
    return subject.asObservable();
  }

  fetch(data: MyGeneric) {
    const subject = new Subject<any>();
    window.setTimeout(() => {
      subject.next({})
      subject.complete()
    }, 1000)
    return subject.asObservable();
    return of() //this.api_create.addUpdateLocation(new ManageLocationDTO(data));
  }

  init() { }
  toJSON() { }

   fetchbyid(id: number) {

  }

   delete(id: number) {
    return 
  }

}
