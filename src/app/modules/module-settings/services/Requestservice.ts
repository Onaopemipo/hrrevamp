import { Injectable } from '@angular/core';
import { IStatus, MyColor } from 'app/components/status/models';
import { AddUpdateRequestTypeServiceProxy, DeleteRequestTypeServiceProxy, GetAllRequestTypeServiceProxy, GetRequestTypeByIdServiceProxy, IMessageOut, LocationDTO, ManageEventDTO, ManageLocationDTO, ManageRequestTypeDTO, Request, RequestTypeDTO } from 'app/_services/service-proxies';
import { of, Subject } from 'rxjs';
import { BaseFilter, CrudService, DEFAULT_PAGE_SIZE, ListResult } from './api.service';
import { MyEvent } from './events.service';

export class MyRequest implements IStatus {
   request: RequestTypeDTO;
   Name: string;
   Code: string;
   Approval: string;
   Enable_Notification: boolean;
   is_Active: boolean;
   Date_Created: Date;
   id: number;
   Enable_Step: boolean;
   isSystem: boolean;
  // location: LocationDTO;
  //   Title: string;
  //   isSystem: boolean;
  //   Notify_Employee:boolean

  // id: number;



  public constructor(request = new RequestTypeDTO()) {
    this.request = request;
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

  fromObj(obj: object) {
    Object.assign(this, obj);
    return this;
  }

  toManage() {
    return new ManageRequestTypeDTO({
      name: this.Name,
      id: this.id,
      code: this.Code,
      is_StepNotify: this.Enable_Step,
      is_SystemRequirment: this.isSystem,
      isActive: this.is_Active
    });
  }
}

export interface RequestFilter extends BaseFilter {
 
  Name?: string;
  Approval?: string;
  Enable_Notification?: boolean;
  is_Active?: string;
  Date_Created?: Date;
  id?: number;

}

@Injectable({
  providedIn: 'root'
})
export class RequestService implements CrudService<RequestFilter, MyRequest, MyRequest>{

  pageSize = DEFAULT_PAGE_SIZE;
  constructor(
    private api_get: GetRequestTypeByIdServiceProxy,
    private api_create: AddUpdateRequestTypeServiceProxy,
    private api_list: GetAllRequestTypeServiceProxy,
    private api_delete: DeleteRequestTypeServiceProxy,
  ) { }

  list(filter: RequestFilter) {
    const subject = new Subject<ListResult<any>>();
    this.api_list.getAllRequestType(this.pageSize, filter.page ? filter.page : 1).subscribe(data => {
      subject.next({
        data: data.result.map(event => new MyRequest(event)),
        length: data.totalCount,
      });
      subject.complete();
    });
    // window.setTimeout(() => {
    //   subject.next({
    //     data: [
    //       new MyRequest(), new MyRequest()
    //     ], length: 10
    //   })
    //   subject.complete()
    // }, 1000)
    return subject.asObservable();
  }

  create(data: MyRequest) {
    return this.api_create.addUpdateRequestType(data.toManage());
  }

  init() { }
  toJSON() { }

  // fetch(id: number) {

  // }

  // delete(id: number) {
  //   return 
  // }

}
