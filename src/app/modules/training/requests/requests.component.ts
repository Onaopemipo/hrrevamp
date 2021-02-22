import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  pageTitle: string = 'Training Request';
  myButton: string = 'New Training';
  myRequestHeader = 'There is no request at the moment';
  myRequestDesc = 'Check back later';
  requestData: string = 'wdd';
  welcome: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

}
