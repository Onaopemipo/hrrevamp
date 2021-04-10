import { FullCalendarModule } from '@fullcalendar/angular';
import { TrainingRoutingModule } from './training-routing.module';
import { ComponentsModule } from 'app/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RequestsComponent } from './requests/requests.component';
import { PlansComponent } from './plans/plans.component';
import { AdministrationComponent } from './administration/administration.component';

// import { NbLayoutModule , NbCardModule, NbIconModule, NbSelectModule } from '@nebular/theme';

import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  // NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbTreeGridModule,
  NbTabsetModule,
  NbTooltipModule,
  NbPopoverModule,
  NbAlertModule,
  NbSearchModule,
  NbCalendarKitModule,
  NbCalendarModule,
  NbCalendarRangeModule,
  NbProgressBarModule,
  NbSpinnerModule,
  NbListModule,



} from '@nebular/theme';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { VendorService } from './services/vendor.service';
import { TrainingServiceProxy } from 'app/_services/service-proxies';
import { CategoriesComponent } from './categories/categories.component';
import { TrainingCategoryService } from './services/training-category.service';
import { TrainingSpecializationService } from './services/training-specialization.service';
import { TrainingPlanService } from './services/plan.service';
import { SpecializationComponent } from './specialization/specialization.component';
import { TrainingTypeComponent } from './training-type/training-type.component';
import { TrainingVendorComponent } from './training-vendor/training-vendor.component';
import { TypesService } from './services/types.service';
import { TrainingComponent } from './training/training.component';
import { ThemeModule } from 'app/@theme/theme.module';

@NgModule({
  declarations: [DashboardComponent, RequestsComponent, PlansComponent, AdministrationComponent, CategoriesComponent, SpecializationComponent, TrainingTypeComponent, TrainingVendorComponent, TrainingComponent],
  providers: [
    TrainingServiceProxy,
    VendorService,
    TrainingCategoryService,
    TrainingSpecializationService,
    TrainingPlanService,
    TypesService,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    TrainingRoutingModule,
    NbTabsetModule,
    NbDatepickerModule,
    NbCardModule,
    NbSelectModule,
    NgxChartsModule,
    NgxEchartsModule,
    FullCalendarModule,
    NbRadioModule,
    ThemeModule,
  ]
})
export class TrainingModule { }
