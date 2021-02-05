import { Component } from '@angular/core';

@Component({
  selector: 'ngx-single-column-header-layout',
  styleUrls: ['./single-column-header.layout.scss'],
  template: `
    <nb-layout>
    <nb-layout-header fixed>
    <ngx-header></ngx-header>
     </nb-layout-header>
      <nb-layout-column style="padding: 0 !important;">
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class SingleColumnHeaderLayoutComponent {}
