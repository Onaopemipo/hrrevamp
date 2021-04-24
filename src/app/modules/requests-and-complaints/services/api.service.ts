import { Injectable } from '@angular/core';
import { AddUpdateRequestServiceProxy, GetAllRequestServiceProxy, GetAllRequestTypeServiceProxy, ManageRequestDTO } from 'app/_services/service-proxies';
import { of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import IComplaintFactory from '../data/factories/complaint.factory';
import { IComplaint } from '../main/models';

export class RequestFilter {
  pageSize?: number;
  pageNo: number;
  typeId: number;
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private create_api: AddUpdateRequestServiceProxy,
    private list_api: GetAllRequestServiceProxy,
    private request_types_api: GetAllRequestTypeServiceProxy,
  ) {}

  getRequestTypes() {
    return this.request_types_api.getAllRequestType(1000, 1).pipe(map(res => res.result));
  }

  getComplaints(filter: RequestFilter) {
    return this.list_api.getAllRequest(0, 0, 0, filter.typeId, 10, filter.pageNo).pipe(map(res => {
      return {
        data: res.result,
        length: res.totalCount,
      };
    }));
    // const subject = new Subject<IComplaint[]>();
    // window.setTimeout(() => {
    //   subject.next(IComplaintFactory.buildList(10));
    //   subject.complete();
    // }, 3000);
    // return subject;
  }

  createComplaint(data: ManageRequestDTO) {
    const _data = {...data};
    data.employeeId = data.employeeId[0];
    return this.create_api.addUpdateRequest(data);
  }
}
