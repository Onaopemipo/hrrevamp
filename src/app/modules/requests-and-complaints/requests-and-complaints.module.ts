import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { RequestsAndComplaintsRoutingModule } from './requests-and-complaints-routing.module';
import { ApiService } from './services/api.service';
import { ComponentsModule } from 'app/components/components.module';
import { NbInfiniteListDirective, NbListModule, NbSelectModule, NbTabsetModule } from '@nebular/theme';
import { ComplaintDetailComponent } from './complaint-detail/complaint-detail.component';
import { SelectInputComponent } from './components/select-input/select-input.component';
import { FormsModule } from '@angular/forms';
import { AddUpdateRequestServiceProxy, GetAllRequestServiceProxy, GetAllRequestTypeServiceProxy } from 'app/_services/service-proxies';



@NgModule({
  declarations: [MainComponent, ComplaintDetailComponent, SelectInputComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    RequestsAndComplaintsRoutingModule,
    NbTabsetModule,
    NbListModule,
    NbSelectModule,
    FormsModule,
  ],
  providers: [
    ApiService,
    AddUpdateRequestServiceProxy,
    GetAllRequestServiceProxy,
    GetAllRequestTypeServiceProxy,
  ]
})
export class RequestsAndComplaintsModule { }
