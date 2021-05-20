import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-confirm-box',
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.scss']
})
export class ConfirmBoxComponent implements OnInit {

  a = {
    b: 1,
    c: 2
  };
  constructor() { }

  ngOnInit(): void {
    console.log(this.a.b);
  }

}
