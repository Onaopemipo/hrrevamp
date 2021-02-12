import { Component, OnInit } from '@angular/core';
import { Email } from '../models';
import IEmailFactory from '../factory';

@Component({
  selector: 'ngx-mail-detail',
  templateUrl: './mail-detail.component.html',
  styleUrls: ['./mail-detail.component.scss']
})
export class MailDetailComponent implements OnInit {
  email = new Email(IEmailFactory.buildList(1)[0]);
  constructor() { }

  ngOnInit(): void {
  }

}
