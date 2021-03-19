import { Injectable } from '@angular/core';
import { IStatus, MyColor } from 'app/components/status/models';
import { AddUpdateLocationServiceProxy, GetAllLocationsServiceProxy, GetLocationByIdServiceProxy, IMessageOut, LocationDTO, ManageLocationDTO } from 'app/_services/service-proxies';
import { of, Subject } from 'rxjs';
import { BaseFilter, CrudService, DEFAULT_PAGE_SIZE, ListResult } from './api.service';

export class MyRequest implements IStatus {
   Request: LocationDTO;
   Name: string;
   Code: string
   Approval: string;
   Enable_Notification: boolean
   is_Active : string
   Date_Created: Date
   id: number;
   Enable_Step: boolean;
   isSystem: boolean
  // location: LocationDTO;
  //   Title: string;
  //   isSystem: boolean;
  //   Notify_Employee:boolean

  // id: number;



  public constructor(Request = {}) {
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

export interface RequestFilter extends BaseFilter {
 
  Name?: string;
  Approval?: string;
  Enable_Notification?: boolean
  is_Active? : string
  Date_Created?: Date
  id?: number;

}

@Injectable({
  providedIn: 'root'
})
export class RequestService implements CrudService<RequestFilter, MyRequest, MyRequest>{

  pageSize = DEFAULT_PAGE_SIZE;
  constructor(
    private api_get: GetLocationByIdServiceProxy,
    private api_create: AddUpdateLocationServiceProxy,
    private api_list: GetAllLocationsServiceProxy,
  ) { }

  list(filter: RequestFilter) {
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
          new MyRequest(), new MyRequest()
        ], length: 10
      })
      subject.complete()
    }, 1000)
    return subject.asObservable();
  }

  create(data: MyRequest) {
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

  // fetch(id: number) {

  // }

  // delete(id: number) {
  //   return 
  // }

}
