import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-applicants-page',
  templateUrl: './applicants-page.component.html',
  styleUrls: ['./applicants-page.component.scss']
})
export class ApplicantsPageComponent implements OnInit {
  actionsList = [
    { title: "dashBoard", label: "Dashboard" },
    { title: "profile", label: "Profile" },
    {title:"preferences",label:"Preferences"}]
  constructor() { }
  actionHeaderClick(event) {
    console.log(event)
  }
  ngOnInit(): void {
  }

}
