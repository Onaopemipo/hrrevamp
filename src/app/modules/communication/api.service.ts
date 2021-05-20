import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Email, EMAIL_STATUS, IEmail } from './page/models';
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
      cc_recipient: email.cc,
      content: email.messageBody,
      date_sent: email.dateToSend,
      status_id: email.isDeleted ? EMAIL_STATUS.TRASH : email.isSent ? EMAIL_STATUS.SENT : EMAIL_STATUS.DRAFT
    }))));
  }

  fetchEmailById(id) {
    return this.api.getEmailLogById(id).pipe(map(data => {
      const email = data.result;
      return new Email({
        id: email.id,
        subject: email.subject,
        recipient: email.receiver,
        cc_recipient: email.cc,
        content: email.messageBody,
        sender_email: email.sender,
        // sender_name: email.sen
        date_sent: email.dateToSend,
        status_id: email.isDeleted ? EMAIL_STATUS.TRASH : email.isSent ? EMAIL_STATUS.SENT : EMAIL_STATUS.DRAFT
      })
    }))
  }
  constructor(
    private api: CommunicationServiceProxy,
  ) { }
}
