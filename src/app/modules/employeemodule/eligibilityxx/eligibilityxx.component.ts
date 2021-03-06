import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-eligibilityxx',
  templateUrl: './eligibilityxx.component.html',
  styleUrls: ['./eligibilityxx.component.scss']
})
export class EligibilityxxComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

 toggle(checked: boolean) {
   if (checked) {
    alert('whats up');
   }

 }
}
