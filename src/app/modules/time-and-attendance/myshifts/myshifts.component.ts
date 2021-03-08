import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-myshifts',
  templateUrl: './myshifts.component.html',
  styleUrls: ['./myshifts.component.scss']
})
export class MyshiftsComponent implements OnInit {
  title: string = 'My Shifts';
  constructor() { }

  ngOnInit(): void {
  }

}
