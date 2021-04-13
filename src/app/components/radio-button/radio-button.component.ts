import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface ISelectable{
  selectValue: string;
  selectLabel: string;
}
@Component({
  selector: 'ngx-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent implements OnInit {

  @Input() horizontal = false;
  // @Output() changed = new EventEmitter<string>();
  @Input() items: ISelectable[] = [];
  selected = '';
  @Input() set value(val) {
    this.selected = val;
  }

  @Output() valueChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  clicked(item) {
    this.valueChange.emit(item);
    this.selected = item;
  }

}
