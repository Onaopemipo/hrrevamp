import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.scss']
})
export class RecruitmentComponent implements OnInit {
  sideMenuToggle: boolean = false;
  menuToggle: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
