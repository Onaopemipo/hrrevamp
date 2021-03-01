import { Component } from '@angular/core';

@Component({
  selector: 'ngx-single-column-layout',
  styleUrls: ['./single-column.layout.scss'],
  template: `
    <nb-layout>
      <nb-layout-column style="padding: 0 !important;">
      <div style="position: relative">
      <div id="hhhh" style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 0"></div>
        <ng-content select="router-outlet"></ng-content>
    </div>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class SingleColumnLayoutComponent {}
