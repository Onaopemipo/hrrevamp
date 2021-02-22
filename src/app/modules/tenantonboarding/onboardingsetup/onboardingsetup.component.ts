import { Component, OnInit, TemplateRef } from '@angular/core';
import { NbIconLibraries } from '@nebular/theme';
import { PaystackOptions } from 'angular4-paystack';
import { AlertserviceService } from '../../../_services/alertservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-onboardingsetup',
  templateUrl: './onboardingsetup.component.html',
  styleUrls: ['./onboardingsetup.component.scss']
})
export class OnboardingsetupComponent implements OnInit {
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

  startSetup() {
    this.beginSetup = false;
    this.selectedPanel = 'companyPanel';
  }

  gotoPanel(paneltitle, wizardtitle) {
    this.title = wizardtitle;
    this.selectedPanel = paneltitle;
  }
  proceedtosubcription() {
    this.title = 'Choose Package';
    this.selectedPanel = 'subscriptionPanel';
  }
  proceedtobilling() {
    this.title = 'Billing Details';
    this.selectedPanel = 'billingPanel';
  }
  showSubscribedModule() {
    this.showModulesModal = true;
  }
  proceedtomodules() {
    this.title = 'Activate Modules';
    this.selectedPanel = 'modulesPanel';
  }
  openSuccessalert() {
    this.alertController.openModalAlert('success', 'System Setup has been completed!', 'Go to Dashboard')
    .subscribe(data => {
      if (data) {
      this.router.navigate(['/dashboard']);
      }
    });
}

  paymentInit() {  }
  paymentCancel() {}
  paymentDone() { }
  ngOnInit(): void {
    this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
  }

}
