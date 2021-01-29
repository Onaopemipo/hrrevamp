import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { RequestsAndComplaintsRoutingModule } from './requests-and-complaints-routing.module';
import { ApiService } from './services/api.service';
import { ComponentsModule } from 'app/components/components.module';



@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    RequestsAndComplaintsRoutingModule
  ],
  providers: [
    ApiService
  ]
})
export class RequestsAndComplaintsModule { }
