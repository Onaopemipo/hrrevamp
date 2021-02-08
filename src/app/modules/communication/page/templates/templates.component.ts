import { Component, OnInit } from '@angular/core';

enum TOP_ACTIONS {
  createNew
}
@Component({
  selector: 'ngx-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  rbutton = [
    { name: TOP_ACTIONS.createNew, label: 'Create new', icon: 'plus', outline: false },
    // { name: 'Add New',icon: 'plus',outline: false },
  ];

  showCreateModal = false;
  pageActionClicked(actionName) {
    this.showCreateModal = true;
  }

}
