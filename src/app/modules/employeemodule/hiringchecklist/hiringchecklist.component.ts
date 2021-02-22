import { Component, OnInit } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'ngx-hiringchecklist',
  templateUrl: './hiringchecklist.component.html',
  styleUrls: ['./hiringchecklist.component.scss']
})
export class HiringchecklistComponent implements OnInit {
  title: string = 'Employee Onboarding';
  subtitle: string = 'Personal Information';
  selectedPanel: string = 'personalInfoPanel';
  showModulesModal = false;
  modalPosition = 'Center';
  messageBody: string = '';
viewmessageBody: string = '';
  constructor(private sanitizer: DomSanitizer) { }

  get sanitizewysiwyg() {
    this.viewmessageBody = this.sanitizer.sanitize(1, this.messageBody);
    
    return this.viewmessageBody;
  }
  proceedtopersonalInfo() {
    this.subtitle = 'Personal Information';
    this.selectedPanel = 'personalInfoPanel';
  }
  proceedtoworkInfo() {
    this.subtitle = 'Work Information';
    this.selectedPanel = 'workInfoPanel';
  }
  proceedtoofferLetter() {
    this.subtitle = 'Offer Letter';
    this.selectedPanel = 'offerletterPanel';
  }

  gotoPanel(paneltitle, wizardtitle) {
    this.subtitle = wizardtitle;
    this.selectedPanel = paneltitle;
  }
  ngOnInit(): void {
  }

}
