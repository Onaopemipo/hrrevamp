import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ngx-wysisyg-input',
  templateUrl: './wysisyg-input.component.html',
  styleUrls: ['./wysisyg-input.component.scss']
})
export class WysisygInputComponent implements OnInit {

  @Input() set value(val: string) {
    this.model = val;
  }
  @Output() valueChange = new EventEmitter<string>();

  @Input() set ngModel(val: string) {
    this.model = val;
  }
  @Output() ngModelChange = new EventEmitter<string>();
  model = '';

  myForm = new FormControl();
  constructor() { }

  ngOnInit(): void {
  }

  onChange() {
    this.valueChange.emit(this.model);
    this.ngModelChange.emit(this.model);
    console.log(this.model);
  }

}
