import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

export interface IRequiredButton {
  name: string;
  label: string;
  outline: boolean;
  icon: string;
}
@Component({
  selector: 'ngx-componentsheader',
  templateUrl: './componentsheader.component.html',
  styleUrls: ['./componentsheader.component.scss'],
})
export class ComponentsheaderComponent implements OnInit {
  @Output() buttonClick = new EventEmitter<string>();
  @Output() backbuttonClick = new EventEmitter<string>();
  @Input() showbackbutton: boolean = false;
  @Input() pageName: string = 'Page Name';
  @Input() requiredButton: IRequiredButton[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
