import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ngx-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss']
})
export class DateRangeComponent implements OnInit {
  _start = new Date();
  _end = new Date();
  @Input() set start(val){
    this._start = val;
  };
  @Input() set end(val){
    this._start = val;
  };
  @Output() startChange = new EventEmitter<Date>();
  @Output() endChange = new EventEmitter<Date>();

  constructor() { }

  ngOnInit(): void {
  }

  updateStart(){
    this.startChange.emit(this._start);
  }

  updateEnd(){
    this.endChange.emit(this._end);
  }

}
