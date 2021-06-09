import { Component,Input } from '@angular/core';

@Component({
  selector: 'ngx-single-column-header-layout',
  styleUrls: ['./single-column-header.layout.scss'],
  template: `
    <nb-layout>
    <nb-layout-header fixed>
    <ngx-customizableheader [menuToggle] = "mtoggle">
    </ngx-customizableheader>
     </nb-layout-header>
      <nb-layout-column style="padding: 0 !important;">
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class SingleColumnHeaderLayoutComponent {
@Input() mtoggle:boolean = false;
}
