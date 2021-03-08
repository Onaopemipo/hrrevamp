import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-myprojects',
  templateUrl: './myprojects.component.html',
  styleUrls: ['./myprojects.component.scss']
})
export class MyprojectsComponent implements OnInit {
  tableColumns = [
    { name: 'a', title: 'S/N' },
    { name: 'b', title: 'Name' },
    { name: 'c', title: 'Supervisor' },
    { name: 'd', title: 'Status' },
    { name: 'e', title: '' },
    { name: 'f', title: '' },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
