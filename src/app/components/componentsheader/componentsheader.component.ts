import { Component, EventEmitter, OnInit, Output,Input } from '@angular/core';

@Component({
  selector: 'ngx-componentsheader',
  templateUrl: './componentsheader.component.html',
  styleUrls: ['./componentsheader.component.scss']
})
export class ComponentsheaderComponent implements OnInit {
  @Output() addnewClick = new EventEmitter();

  @Input() pageName:string = 'Page Name';
  @Input() requiredButton = [];
  constructor() { }

  ngOnInit(): void {
  }

}
