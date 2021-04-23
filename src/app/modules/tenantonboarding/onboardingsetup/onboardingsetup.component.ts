import { Component, OnInit, TemplateRef } from '@angular/core';
import { NbIconLibraries } from '@nebular/theme';
import { PaystackOptions } from 'angular4-paystack';
import { AlertserviceService } from '../../../_services/alertservice.service';
import { Router } from '@angular/router';
import {
  CommonServiceProxy,
  CompanyDTO, DataServiceProxy, FetchSubscriptionPlansServiceProxy, FileParameter, FrequencyRule, IDTextViewModel, RegisterCompanyServiceProxy, SubscriptionPlan, UploadDocumentServiceProxy, VerifySubscriptionPaymentServiceProxy
} from 'app/_services/service-proxies';
import { FormGroup } from '@angular/forms';
import { FlowDirective, Transfer } from '@flowjs/ngx-flow';
@Component({
  selector: 'ngx-onboardingsetup',
  templateUrl: './onboardingsetup.component.html',
  styleUrls: ['./onboardingsetup.component.scss']
})
export class OnboardingsetupComponent implements OnInit {
  companysForm: FormGroup;
  title: string = 'Set up your account';
  src: string = 'assets/icons/camera.jpg';
  selectedPanel: string = '';
  showModulesModal = false;
  modalPosition = 'Center';
  reference = '';
  beginSetup = true;
  companyDTO = new CompanyDTO().clone();
  subPlan: SubscriptionPlan[] = [];
  OrigisubPlan: SubscriptionPlan[] = [];
  files: Transfer[] = [];
  selectedPlan = new SubscriptionPlan().clone();
  selectedPlanModule = [];
  allFrequncy: FrequencyRule[] = [];
  tempRef = '';
  IDTextView: IDTextViewModel[] = [];
  allfileObj: FileParameter[]=[]
  fileObj = {
    userId: 0,
    title: '',
    itemId: 0,
    entityId: 0,
    isReadOnly: undefined,
    tempRef: '',
    files: this.allfileObj
  }
  constructor(iconsLibrary: NbIconLibraries, private alertController: AlertserviceService, private router: Router,
    private FetchSubscriptionPlansService: FetchSubscriptionPlansServiceProxy,private CommonService:CommonServiceProxy,
    private RegisterCompanyService: RegisterCompanyServiceProxy, private UploadDocumentService: UploadDocumentServiceProxy,
  private DataService:DataServiceProxy, private VerifySubscriptionPaymentService: VerifySubscriptionPaymentServiceProxy) {
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
    localStorage.removeItem('tenantSetup');
    localStorage.setItem('tenantSetup',JSON.stringify(this.companyDTO))
  }
  proceedtobilling(planid) {
    this.title = 'Billing Details';
    this.selectedPanel = 'billingPanel';
    if (planid) {
      this.selectedPlan = planid;
      this.companyDTO.subscriptionPlanId = planid.id;
    }
  }
  showSubscribedModule(planModule) {
    this.showModulesModal = true;
    this.selectedPlanModule = planModule;
  }
  proceedtomodules() {
    this.title = 'Activate Modules';
    this.selectedPanel = 'modulesPanel';
  }
  openSuccessalert() {
    this.alertController.openModalAlert('success', 'System Setup has been completed!', 'Go to Dashboard')
      .subscribe(data => {
        this.router.navigate(['/dashboard']);
      if (data) {

      }
    });
}

  paymentInit() {
    this.registerCompany();
   }
  paymentCancel() {}
  paymentDone() {
    this.verifyPayment()
  }
  registerCompany() {
    this.RegisterCompanyService.registerCompany(this.companyDTO).subscribe(data => {
      
    })
  }
  getSubscriptionplan() {
    this.FetchSubscriptionPlansService.getSubscriptionPlans().subscribe(data => {
      if (!data.hasError) {
        this.subPlan = data.result;
        this.OrigisubPlan = data.result;
        this.subPlan = data.result.filter(s => s.name.includes('SmartAce Basic'));
      }
    })
  
  }
  filereceived(event: FlowDirective) {
    event.transfers$.subscribe(value => {
      this.files = value.transfers;

      console.log(this.files)
    });
  }
  onDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  onDropFileceived(event: FlowDirective) {
    event.transfers$.subscribe(value => {
      this.files = value.transfers;
      console.log(this.files)
    });
  }
  removeFile(event: FlowDirective, mFile: Transfer) {
    this.files = this.files.filter(file => file.name !== mFile.name);
    event.cancelFile(mFile);
  }
  getdocumentEntity() {
    this.DataService.docEntityTypes().subscribe(data => {
      if (!data.hasError) {
        this.IDTextView = data.result;
   }
 })
  }

  documentUpload() {
    var newfilObj:FileParameter = {
      data: this.files[0].flowFile.file,
      fileName: this.files[0].flowFile.name
    }
    this.fileObj.entityId = this.IDTextView.find(e => e.text == "OTHERS").id;
    this.fileObj.files.push(newfilObj);
    this.fileObj.tempRef = this.tempRef;
    this.fileObj.title ="Company Logo";
    this.UploadDocumentService.uploadDocs(this.fileObj.userId, this.fileObj.title, this.fileObj.itemId, this.fileObj.entityId, this.fileObj.isReadOnly, this.fileObj.tempRef, this.fileObj.files)
      .subscribe(data => {
      if (!data.hasError) {
        console.log('file success');
      }
    });
  }
  verifyPayment() {
    let userId = '';
    this.VerifySubscriptionPaymentService.verifySubscriptionPayment(userId, this.reference).subscribe(data => {
      if (!data.hasError) {
        this.alertController.openModalAlert(this.alertController.ALERT_TYPES.SUCCESS, data.message, 'OK');
      } else {
        this.alertController.openModalAlert(this.alertController.ALERT_TYPES.FAILED, "Payment Failed, Please try again", 'OK');
    }
  })
}
  
  filterLeavePlan(is_approved = []) {
   
    let tabtittle = "";
    is_approved.forEach(value => {
      if (value.activeValue) tabtittle = value.tabTitle;
    });
   // console.log(tabtittle.toLowerCase())
    this.subPlan = this.OrigisubPlan.filter(s => s.name.toLowerCase().includes(tabtittle.toLowerCase()));

  }
  getfrequency() {
    this.CommonService.getFrequencies().subscribe(data => {
      if (!data.hasError) {
        this.allFrequncy = data.result;
      }
    })
  }
  ngOnInit(): void {
    this.getSubscriptionplan();
    this.getfrequency();
    this.getdocumentEntity();
    this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
    this.tempRef = `ref-${Math.ceil(Math.random() * 10e13)}`;
    this.companyDTO = JSON.parse(localStorage.getItem('tenantSetup'));
    if (!this.companyDTO) {
      this.router.navigate(['/auth/signup']);
    }
  }

}
