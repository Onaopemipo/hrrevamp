import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuComponent, NbMenuItem, NbMenuItemComponent, NbToggleStates, ɵa } from '@nebular/theme';

@Component({
  selector: '[nbMenuItemy]',
  templateUrl: './menu-item.html',
  animations: [
    trigger('toggle', [
      state(NbToggleStates.Collapsed, style({ height: '0', margin: '0' })),
      state(NbToggleStates.Expanded, style({ height: '*' })),
      transition(`${NbToggleStates.Collapsed} <=> ${NbToggleStates.Expanded}`, animate(300)),
    ]),
  ],
})
export class MyMenuItemComponent extends NbMenuItemComponent{

}

@Component({
  selector: 'nb-menu',
  templateUrl: './my-menu.component.html',
  styleUrls: ['../../../../node_modules/@nebular/theme/components/menu/menu.component.css']
})
export class MyMenuComponent extends NbMenuComponent{
  // a: ɵa
  menuItem: NbMenuItem;
  @Input() items: NbMenuItem[];
  constructor(menuInternalService: ɵa, router: Router) {
    super(window.globalThis, 'ssssss', menuInternalService, router);
    window.setTimeout(() => {
      this.menuItem = {
        title: 'main',
        children: this.items
      }
    }, 2000)
    this.menuItem = {
      title: 'main',
      children: this.items
    }
  }

  // ngOnInit(): void {
  // }

}
