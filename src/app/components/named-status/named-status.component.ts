import { INamedStatus } from './model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-named-status',
  templateUrl: './named-status.component.html',
  styleUrls: ['./named-status.component.scss']
})
export class NamedStatusComponent implements OnInit {

  @Input() data: INamedStatus;
  @Input() name: String;

  constructor() { }

  ngOnInit(): void {
  }

  getColor(){
    return this.data.getNamedStatusColor()
  }
  getLabel(){
    return this.data.getNamedStatusLabel()
  }

}
