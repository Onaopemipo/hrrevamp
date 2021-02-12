import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  page = 1;

  gotoBudgetItems(){
    this.page = 2;
  }

}
