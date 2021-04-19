import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Email, IEmail } from './page/models';
import IEmailFactory from './page/factory';
import { CommunicationServiceProxy } from '../../_services/service-proxies';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  fetch_emails(emailType, page) {
    return this.api.getEmailLogs(null, null, '', 10).pipe(map(res => res.result.map(email => new Email({
      id: email.id,
      subject: email.subject,
      recipient: email.receiver,
      cc_recipient: '',
      content: email.messageBody,
      date_sent: email.dateSent,
      status_id: 1
    }))));
  }
  constructor(
    private api: CommunicationServiceProxy,
  ) { }
}
