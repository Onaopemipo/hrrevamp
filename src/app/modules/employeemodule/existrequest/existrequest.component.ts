import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-existrequest',
  templateUrl: './existrequest.component.html',
  styleUrls: ['./existrequest.component.scss']
})
export class ExistrequestComponent implements OnInit {


  selectedOption: string = '';

  constructor() { }

  ngOnInit(): void {
  }


}
