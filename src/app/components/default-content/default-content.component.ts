import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-default-content',
  templateUrl: './default-content.component.html',
  styleUrls: ['./default-content.component.scss']
})
export class DefaultContentComponent implements OnInit {

  @Input() loading = false;
  @Input() pageHeader: string;
  @Input() pageDescription: string;
  @Input() buttonValue: string;
  @Input() loading: boolean = false;
  @Output() buttonClick = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

}
