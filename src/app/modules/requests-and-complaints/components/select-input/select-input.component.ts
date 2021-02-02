import { Component, OnInit } from '@angular/core';
import { SelectOption } from './models';

@Component({
  selector: 'ngx-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss']
})
export class SelectInputComponent implements OnInit {

  options: SelectOption[];
  innerValue: string;

  constructor() { }

  ngOnInit(): void {
  }

}
