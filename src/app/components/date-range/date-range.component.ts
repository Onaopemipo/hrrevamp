import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export class DateRange{
  start: Date;
  end: Date;
}

@Component({
  selector: 'ngx-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss']
})
export class DateRangeComponent implements OnInit {
  _start = new Date();
  _end = new Date();
  @Input() set start(val) {
    this._start = val;
  }
  @Input() set end(val) {
    this._start = val;
  }
  @Output() startChange = new EventEmitter<Date>();
  @Output() endChange = new EventEmitter<Date>();
  @Output() valueChange = new EventEmitter<DateRange>();
  @Input() set value(val: DateRange) {
    if (val) {
      this._start = val.start;
      this._end = val.end;
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

  updateValue() {
    this.valueChange.emit({
      start: this._start,
      end: this._end,
    });
  }

  updateStart() {
    this.startChange.emit(this._start);
    this.updateValue();
  }

  updateEnd() {
    this.endChange.emit(this._end);
    this.updateValue();
  }

}
