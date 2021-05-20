import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Email } from '../models';
import IEmailFactory from '../factory';
import { ApiService } from '../../api.service';

@Component({
  selector: 'ngx-mail-detail',
  templateUrl: './mail-detail.component.html',
  styleUrls: ['./mail-detail.component.scss']
})
export class MailDetailComponent implements OnInit {
  email: Email;
  loading = true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(async(data) => {
      const id = Number(data.get('id'));
      this.email = await this.api.fetchEmailById(id).toPromise();
      this.loading = false;
    })
  }

}
