import { TableColumn } from 'app/components/tablecomponent/models';
import { TableAction } from './../../../components/tablecomponent/models';
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
  requestData: string = '';
  welcome: boolean = true;

  myTable: TableColumn [] = [
    {name: 'beneficiary', title: 'Beneficiary'},
  {name: 'trainingType', title: 'Training Type'},
  {name: 'specialiazation', title: 'Specialiazation'},
  {name: 'vendor', title: 'Vendor'},
  {name: 'startDate', title: 'Start Date'},
  {name: 'endDate', title: 'End Date'} ];

  constructor() { }

  ngOnInit(): void {
    // console.log(this.pageTitle);
  }

}
