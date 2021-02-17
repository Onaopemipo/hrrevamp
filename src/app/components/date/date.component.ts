import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDatepicker, NbDatepickerComponent, NbDatepickerDirective, NbPopoverDirective } from '@nebular/theme';

@Component({
  selector: 'ngx-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit {
  @ViewChild(NbDatepickerDirective) datePicker: NbDatepickerComponent<String>;
  // @ViewChild(NbPopoverDirective) popOver: NbPopoverDirective;

  constructor() { }

  ngOnInit(): void {
  }

  show() {
    console.log(this.datePicker);
    window.globalThis.ccc = this.datePicker;
    window.setTimeout(() => {
      this.datePicker.picker.show();
    }, 200);
  }

}
