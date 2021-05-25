import { RecruitmentJobServiceProxy } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-applicantssignin',
  templateUrl: './applicantssignin.component.html',
  styleUrls: ['./applicantssignin.component.scss']
})
export class ApplicantssigninComponent implements OnInit {

  constructor(private applicant: RecruitmentJobServiceProxy) { }

  ngOnInit(): void {
  }

}
