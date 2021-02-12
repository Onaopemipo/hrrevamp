import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ngx-side-modal',
  templateUrl: './side-modal.component.html',
  styleUrls: ['./side-modal.component.scss']
})
export class SideModalComponent implements OnInit {
  @Input() position = "";
  @Input() set show(val: boolean) {
    this.show_modal = val;
  }
  @Output() showChange = new EventEmitter<boolean>();

  get center() {
    return this.position === 'Center';
  }
  show_modal = false;
  constructor() { }

  ngOnInit(): void {
  }

  openModal() {
    this.show_modal = true;
  }

  closeModal() {
    this.show_modal = false;
    this.showChange.emit(this.show_modal);
  }
}
