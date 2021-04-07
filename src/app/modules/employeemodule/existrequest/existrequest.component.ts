import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-existrequest',
  templateUrl: './existrequest.component.html',
  styleUrls: ['./existrequest.component.scss']
})
export class ExistrequestComponent implements OnInit {


  selectedOption: string = '';

  constructor(private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
   
  }

 // checked = false;

  toggle(checked: boolean) {
   // this.checked = checked;
  }

}

