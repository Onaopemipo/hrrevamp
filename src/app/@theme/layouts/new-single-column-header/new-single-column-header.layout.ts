import { Component,Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-new-single-column-header-layout',
  styleUrls: ['./new-single-column-header.layout.scss'],
  template: `
    <nb-layout>
    <nb-layout-header fixed>
    <ngx-header [menuToggle]="false" [actionsList]="actionsList" (buttonClick)="handleClick($event)">
    </ngx-header>
     </nb-layout-header>
      <nb-layout-column style="padding: 0 !important;">
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class NewSingleColumnHeaderLayoutComponent {
  @Input() actionsList = [];
  @Output() headerClick = new EventEmitter();

  handleClick(event) {
 
    this.headerClick.emit(event);
  }
}
