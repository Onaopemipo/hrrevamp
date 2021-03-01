import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'ngx-side-modal',
  templateUrl: './side-modal.component.html',
  styleUrls: ['./side-modal.component.scss']
})
export class SideModalComponent implements OnInit {
  @ViewChild('host') host: ElementRef;
  @Input() isPage = false;
  @Input() position = '';
  @Input() set show(val: boolean) {
    if (val) {
      this.openModal();
    } else {
      this.closeModal();
    }
  }
  @Output() showChange = new EventEmitter<boolean>();

  get center() {
    return this.position === 'Center';
  }
  show_modal = false;
  constructor() { }

  ngOnInit(): void {
  }

  showPage() {
    const h = window.globalThis.document.getElementById('hhhh');
    h.appendChild(this.host.nativeElement);
    h.style.zIndex = '10000';
  }

  hidePage() {
    const h = window.globalThis.document.getElementById('hhhh');
    h.style.zIndex = '0';
  }

  openModal() {
    this.show_modal = true;
    if (this.isPage) this.showPage();
  }

  closeModal() {
    this.show_modal = false;
    this.showChange.emit(this.show_modal);
    if (this.isPage) this.hidePage();
  }
}
