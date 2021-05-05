import { Component, Input, OnInit } from '@angular/core';
import { IStatus } from './models';

@Component({
  selector: 'ngx-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  @Input() data: IStatus;
  @Input() name: String;

  constructor() { }

  ngOnInit(): void {
  }

  getColor(){
    return this.data.getStatusColor()
  }
  getLabel(){
    return this.data.getStatusLabel()
  }

}
