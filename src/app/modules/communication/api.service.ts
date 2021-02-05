import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IEmail } from './page/models';
import IEmailFactory from './page/factory';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  fetch_emails(emailType, page) {
    const subject = new Subject<IEmail[]>();
    window.setTimeout(() => {
      subject.next(IEmailFactory.buildList(10));
      subject.complete();
    }, 3000);
    return subject;
  }
  constructor() { }
}
