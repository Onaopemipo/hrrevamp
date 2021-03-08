
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-payrollcomponent',
  templateUrl: './payrollcomponent.component.html',
  styleUrls: ['./payrollcomponent.component.scss']
})
export class PayrollcomponentComponent implements OnInit {
  selectedCase : string = ''

  createStage: boolean = true;
  createTemplate: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  createNew(){
this.router.navigateByUrl('/payroll/paymentcreate')
  }

}
