import { PlatformLocation } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'ngx-side-modal',
  templateUrl: './side-modal.component.html',
  styleUrls: ['./side-modal.component.scss']
})
export class SideModalComponent implements OnInit {
  @ViewChild('host') host: ElementRef;
  @Input() isPage = false;
  @Input() position = '';
  @Input() title = '';
  @Input() set show(val: boolean) {
    if (val) {
      this.openModal();
    } else {
      this.closeModal();
    }
  }
  @Output() showChange = new EventEmitter<boolean>();
  @Output() closed = new EventEmitter<boolean>();

  get center() {
    return this.position === 'Center';
  }
  show_modal = false;
  constructor(
    private platformLocation: PlatformLocation
  ) {
    // history.pushState(null, null, location.href);
    // this.platformLocation.onPopState = () => {
    //   alert(100)
    //   history.pushState(null, null, window.location.href);
    //   this.closeModal();
    // };
  }

  ngOnInit(): void {
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.closeModal();
  }


  // showPage() {
  //   const h = window.globalThis.document.getElementById('hhhh');
  //   h.appendChild(this.host.nativeElement);
  //   h.style.zIndex = '10000';
  // }

  // hidePage() {
  //   const h = window.globalThis.document.getElementById('hhhh');
  //   h.style.zIndex = '0';
  // }

  openModal() {
    history.pushState(null, null, location.href);
    // this.router.navigateByUrl(this.router.url);
    this.show_modal = true;
    // if (this.isPage) this.showPage();
  }

  closeModal() {
    this.show_modal = false;
    this.showChange.emit(this.show_modal);
    this.closed.emit(true);
    // if (this.isPage) this.hidePage();
  }
}
