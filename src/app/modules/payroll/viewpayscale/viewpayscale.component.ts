import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-viewpayscale',
  templateUrl: './viewpayscale.component.html',
  styleUrls: ['./viewpayscale.component.scss']
})
export class ViewpayscaleComponent implements OnInit {
  tableColumns  = [
    { name: 'a', title: 'NAME' },
    { name: 'b', title: 'ID' },
    { name: 'c', title: 'DEPARTMENT' },
    { name: 'd', title: 'DESIGNATION' },
  ]
  topActionButtons = [
    
  ]
  constructor() { }

  ngOnInit(): void {
  }
  modal(event ) {

  }
}
