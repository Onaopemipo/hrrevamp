import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-customizable-column-layout',
  styleUrls: ['./customizable-column.layout.scss'],
  template: `
    <nb-layout windowMode>
    <nb-layout-header fixed>
    <ngx-customizableheader></ngx-customizableheader>
   </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive *ngIf="sideMenuToggle">
        <ng-content select="[Customizedmenu]"></ng-content>
      </nb-sidebar>

      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
        <div style="margin-bottom: 61px;"></div>
      </nb-layout-column>

      <nb-layout-footer fixed *ngIf="sideFooterToggle">
        <ngx-footer></ngx-footer>
      </nb-layout-footer>
    </nb-layout>
  `,
})
export class CustomizablecolumnComponent {
  @Input() sideMenuToggle: boolean = true;
  @Input() sideFooterToggle: boolean = true;
}
