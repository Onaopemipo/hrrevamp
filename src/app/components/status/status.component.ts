import { Component, Input, OnInit } from '@angular/core';
import { IStatus } from './models';

@Component({
  selector: 'ngx-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  @Input() data: IStatus;

  constructor() { }

  ngOnInit(): void {
  }

}
