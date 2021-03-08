import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-applicant-module',
  templateUrl: './applicant-module.component.html',
  styleUrls: ['./applicant-module.component.scss']
})
export class ApplicantModuleComponent implements OnInit {
  sideMenuToggle: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

}
