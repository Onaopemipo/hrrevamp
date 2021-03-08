import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-discipline-edit',
  templateUrl: './discipline-edit.component.html',
  styleUrls: ['./discipline-edit.component.scss']
})
export class DisciplineEditComponent implements OnInit {

  _createNew = false;
  @Input() set createNew(val: boolean) {
    this._createNew = val;
    this.classes = {
      'card' : !val,
      'main-page-container': !val,
      'create': val
    };
    if(val){
      this.showDetails = true;
    }
  }
  get createNew() {
    return this._createNew;
  }

  showDetails = false;
  constructor() { }

  ngOnInit(): void {

  }

  classes = {
    'card' : !this.createNew,
    'main-page-container': !this.createNew,
    create: this.createNew
  };

  showDetail() {
    this.showDetails = true;
  }
}
