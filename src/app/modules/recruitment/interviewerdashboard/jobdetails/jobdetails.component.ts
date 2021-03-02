import { TableColumn } from './../../../../components/tablecomponent/models';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-jobdetails',
  templateUrl: './jobdetails.component.html',
  styleUrls: ['./jobdetails.component.scss']
})
export class JobdetailsComponent implements OnInit {

  jobTitle: string = 'Technical Support';

  myApplicantTable: TableColumn [] = [
    {name: 'name', title: 'Name'},
    {name: 'email', title: 'Email'},
    {name: 'role', title: 'Role'},
    {name: 'dateApplied', title: 'Date Applied'}];
  constructor(private navCtrl: Location) { }

  ngOnInit(): void {
  }

  goback(){
    this.navCtrl.back();
  }

}
