import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from './pages-menu';
@Component({
  selector: 'ngx-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit {
  menu = MENU_ITEMS;
  constructor() { }

  ngOnInit(): void {
  }

}
