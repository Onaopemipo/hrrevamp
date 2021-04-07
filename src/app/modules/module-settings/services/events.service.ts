import { Injectable } from '@angular/core';
import { IStatus, MyColor } from 'app/components/status/models';
import { AddUpdateEventsServiceProxy, AddUpdateLocationServiceProxy, DeleteEventsServiceProxy,
  EventDTO,
  GetAllEventsServiceProxy, GetAllLocationsServiceProxy, GetAllRequestTypeServiceProxy,
  GetEventsByIdServiceProxy, GetLocationByIdServiceProxy, IMessageOut,
  LocationDTO, ManageEventDTO, ManageLocationDTO
} from 'app/_services/service-proxies';
import { of, Subject } from 'rxjs';
import { BaseFilter, CrudService, DEFAULT_PAGE_SIZE, ListResult } from './api.service';

export class MyEvent implements IStatus {
  location: LocationDTO;
  Title: string;
  isSystem: boolean;
  Notify_Employee: boolean;
  id: number;

  public constructor(event = new EventDTO()) {
    this.Title = event.title;
    this.isSystem = event.isSystem;
    this.Notify_Employee = event.notify_Employee;
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

  eventTypeId = 0;
  startDate = new Date();
  endDate = new Date();
  description = '';
  toManage() {
    return new ManageEventDTO({
      id: this.id,
      title: this.Title,
      notify_Employee: this.Notify_Employee,
      eventTypeId: this.eventTypeId,
      startDate: this.startDate,
      endDate: this.endDate,
      description: this.description,
    });
  }
}

export interface EventFilter extends BaseFilter {
  Department_name?: string;
  Department_code?: number;
  status?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class EventService implements CrudService<EventFilter, MyEvent, MyEvent>{

  pageSize = DEFAULT_PAGE_SIZE;
  constructor(
    private api_get: GetEventsByIdServiceProxy,
    private api_create: AddUpdateEventsServiceProxy,
    private api_list: GetAllEventsServiceProxy,
    private api_delete: DeleteEventsServiceProxy,
  ) { }

  list(filter: EventFilter) {
    const subject = new Subject<ListResult<any>>();
    this.api_list.getAllEvents(this.pageSize, filter.page ? filter.page : 1).subscribe(data => {
      subject.next({
        data: data.result.map(event => new MyEvent(event)),
        length: data.totalCount,
      });
      subject.complete();
    });
    return subject.asObservable();
  }

  create(data: MyEvent) {
    // const subject = new Subject<any>();
    // window.setTimeout(() => {
    //   subject.next({});
    //   subject.complete();
    // }, 1000)
    // return subject.asObservable();
    return this.api_create.addUpdateEvent(data.toManage());
  }

  init() { }
  toJSON() { }

  // fetch(id: number) {

  // }

  // delete(id: number) {
  //   return 
  // }

}
