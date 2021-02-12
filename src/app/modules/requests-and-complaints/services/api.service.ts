import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import IComplaintFactory from '../data/factories/complaint.factory';
import { IComplaint } from '../main/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  getComplaints(page: number) {
    const subject = new Subject<IComplaint[]>();
    window.setTimeout(() => {
      subject.next(IComplaintFactory.buildList(10));
      subject.complete();
    }, 3000);
    return subject;
  }
}
