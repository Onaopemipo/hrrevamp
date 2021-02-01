import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-side-modal',
  templateUrl: './side-modal.component.html',
  styleUrls: ['./side-modal.component.scss']
})
export class SideModalComponent implements OnInit {

  show_modal = false;
  constructor() { }

  ngOnInit(): void {
  }

  openModal() {
    this.show_modal = true;
  }

  closeModal() {
    this.show_modal = false;
  }
}
