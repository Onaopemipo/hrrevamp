import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-onboardingsetup',
  templateUrl: './onboardingsetup.component.html',
  styleUrls: ['./onboardingsetup.component.scss']
})
export class OnboardingsetupComponent implements OnInit {
  title: string = "Set up your account"
  src: string = "assets/icons/camera.jpg";
  constructor() { }

  ngOnInit(): void {
  }

}
