import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from './pages-menu';
@Component({
  selector: 'ngx-blayout',
  templateUrl: './blayout.component.html',
  styleUrls: ['./blayout.component.scss'],
})
export class BlayoutComponent implements OnInit {
  menu = MENU_ITEMS;
  constructor() { }

  ngOnInit(): void {
  }

}
