import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisbursementComponent } from './disbursement.component';
import { ComponentsModule } from 'app/components/components.module';
import { DisbursmentRoutingModule } from './disbursement.routing.module';
import { SetupComponent } from './budget/setup/setup.component';



@NgModule({
  declarations: [DisbursementComponent, SetupComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    DisbursmentRoutingModule,
  ]
})
export class DisbursementModule { }
