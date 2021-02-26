import { Component } from '@angular/core';

@Component({
  selector: 'ngx-single-column-layout',
  styleUrls: ['./single-column.layout.scss'],
  template: `
    <nb-layout>
      <nb-layout-column style="padding: 0 !important;">
      
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class SingleColumnLayoutComponent {}
