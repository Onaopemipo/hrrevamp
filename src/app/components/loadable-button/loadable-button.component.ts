import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-loadable-button',
  templateUrl: './loadable-button.component.html',
  styleUrls: ['./loadable-button.component.scss']
})
export class LoadableButtonComponent implements OnInit {

  @Input() loading = false;
  constructor() { }

  ngOnInit(): void {
  }

}
