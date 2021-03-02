import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-myongoingshifts',
  templateUrl: './myongoingshifts.component.html',
  styleUrls: ['./myongoingshifts.component.scss']
})
export class MyongoingshiftsComponent implements OnInit {
  title:string = 'Ongoing Shifts'
  constructor() { }

  ngOnInit(): void {
  }

}
