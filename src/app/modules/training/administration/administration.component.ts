import { NbTabComponent } from '@nebular/theme';
import { TableAction, TableActionEvent, TableColumn } from './../../../components/tablecomponent/models';
import { TopAction } from './../../../components/componentsheader/models';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TAB } from '@angular/cdk/keycodes';
import { BaseComponent } from 'app/components/base/base.component';
import { ConfirmBoxService } from 'app/_services/confirm-box.service';
import { MyVendor, VendorService } from '../services/vendor.service';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { ListResult } from 'app/_services/base-api.service';
import { Observable } from 'rxjs';
import { TrainingTypeComponent } from '../training-type/training-type.component';
import { TrainingVendorComponent } from '../training-vendor/training-vendor.component';

enum TABS {
  vendors = 'vendor', types = 'type'
}
const TABS_CONFIG = {};
TABS_CONFIG[TABS.vendors] = {
  pageTitle: 'Vendors',
  createButton: 'Add Vendor'
};
TABS_CONFIG[TABS.types] = {
  pageTitle: 'Types',
  createButton: 'Add Type'
};

@Component({
  selector: 'ngx-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent {
  @ViewChild(TrainingTypeComponent) trainingType: TrainingTypeComponent;
  @ViewChild(TrainingVendorComponent) trainingVendor: TrainingVendorComponent;
  selectedTab = TABS.vendors;
  TABS = TABS;
  get pageTitle() {
    return TABS_CONFIG[this.selectedTab].pageTitle;
  }

  get rButton() {
    return [{name: 'newTraining', label: TABS_CONFIG[this.selectedTab].createButton, icon: 'plus'}];
  }

  tabSelected(tab: NbTabComponent) {
    this.selectedTab = tab.tabId as any;
  }

  pageActionClicked(event) {
    if (this.selectedTab === TABS.vendors) {
      this.trainingVendor.createNewClicked();
    } else {
      this.trainingType.createNewClicked();
    }
  }
}
