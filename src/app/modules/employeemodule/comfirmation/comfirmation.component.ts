import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-comfirmation',
  templateUrl: './comfirmation.component.html',
  styleUrls: ['./comfirmation.component.scss']
})
export class ComfirmationComponent implements OnInit {
  tableColumns = [
    { name: 'a', title: 'S/N' },
    { name: 'b', title: 'EMPLOYEE' },
    { name: 'c', title: 'STAFF NO' },
    { name: 'd', title: 'APPOINTMENT DATE' },
    { name: 'e', title: 'PROBATION PERIOD' },
    { name: 'f', title: 'REQUESTED BY' },
    { name: 'g', title: 'REQUESTED STATUS' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
