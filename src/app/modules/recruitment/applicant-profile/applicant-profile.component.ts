import { AlertserviceService } from './../../../_services/alertservice.service';
import { Component, OnInit } from '@angular/core';
import { NbIconLibraries } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-applicant-profile',
  templateUrl: './applicant-profile.component.html',
  styleUrls: ['./applicant-profile.component.scss']
})
export class ApplicantProfileComponent implements OnInit {

  pageTitle: string = 'Profile';
  title: string = 'Set up your account';
  src: string = 'assets/icons/camera.jpg';
  selectedPanel: string = '';
  showModulesModal = false;
  modalPosition = 'Center';
  reference = '';
  beginSetup = true;


  constructor(iconsLibrary: NbIconLibraries, private alertController: AlertserviceService, private router: Router ) {
    iconsLibrary.registerFontPack('ion', { iconClassPrefix: 'ion' });
    iconsLibrary.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
    iconsLibrary.registerFontPack('far', { packClass: 'far', iconClassPrefix: 'fa' });
  }
  ngOnInit(): void {
  }

}
