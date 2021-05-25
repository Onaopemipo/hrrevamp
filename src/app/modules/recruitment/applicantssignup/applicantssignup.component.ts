import { RecruitmentJobServiceProxy } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-applicantssignup',
  templateUrl: './applicantssignup.component.html',
  styleUrls: ['./applicantssignup.component.scss']
})
export class ApplicantssignupComponent implements OnInit {

  applicantModel

  constructor(private applicant: RecruitmentJobServiceProxy) { }

  ngOnInit(): void {
  }

  regiterApplicant(){
    this.applicant
  }
}
