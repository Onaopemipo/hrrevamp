import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { NbDatepicker, NbDatepickerComponent, NbDatepickerDirective, NbPopoverDirective } from '@nebular/theme';
import { format } from 'date-fns'
@Component({
  selector: 'ngx-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit {
  @ViewChild(NbDatepickerDirective) datePicker: NbDatepickerComponent<String>;
  // @ViewChild(NbPopoverDirective) popOver: NbPopoverDirective;


  // Start of Philip Code in case you need to clear it
  _dateItem = new Date();
  @Input() min;
  @Input() max;
  set dateItem(val: Date) {
    this.valueChange.emit(val);
    this._dateItem = val;
  };

  get dateItem() {
    return this._dateItem;
  }
  selectedDate: Date;
  @Input() set value(val) {
    this._dateItem = val;  
  }

  @Output() valueChange = new EventEmitter<Date>();

  // End of Philp Code in case you need to clear it

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

  dateChanged() {

    this.valueChange.emit(this.dateItem);
    // console.log(this.dateItem)
  }

}
