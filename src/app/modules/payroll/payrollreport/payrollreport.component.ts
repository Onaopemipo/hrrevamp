import { Component, OnInit } from '@angular/core';
import { TableAction, TableActionEvent } from 'app/components/tablecomponent/models';


enum TABLE_ACTION {
  VIEW = '1',
  DELETE = '2',
  EDIT = '3'
}


@Component({
  selector: 'ngx-payrollreport',
  templateUrl: './payrollreport.component.html',
  styleUrls: ['./payrollreport.component.scss']
})
export class PayrollreportComponent implements OnInit {
  showViewModal: boolean = false
  tableColumns = [
    { name: 'a', title: 'NAME/ID' },
    { name: 'b', title: 'DEPARTMENT' },
    { name: 'c', title: 'BANK NAME' },
    { name: 'd', title: 'ACCOUNT NO' },
    { name: 'e', title: 'EARNINGS' },
    { name: 'e', title: 'DEDUCTIONS' },
    { name: 'f', title: 'NET PAY' },
    { name: 'g', title: 'INSTITUTION' },
  ];
  //EARNINGS TABLE
  tableColumn = [
    { name: 'a', title: 'NAME/ID' },
    { name: 'b', title: 'DEPARTMENT' },
    { name: 'c', title: 'LOCATION' },
    { name: 'd', title: 'GRADE LEVEL' },
    { name: 'e', title: 'GRADE STEP' },
    { name: 'e', title: 'LEAVE' },
    { name: 'f', title: 'BONUS' },
    { name: 'g', title: 'OTHERS' },
  ];
  //Deduction Table
  tableColum = [
    { name: 'a', title: 'NAME/ID' },
    { name: 'b', title: 'DEPARTMENT' },
    { name: 'c', title: 'LOCATION' },
    { name: 'd', title: 'GRADE LEVEL' },
    { name: 'e', title: 'GRADE STEP' },
    { name: 'e', title: 'LEAVE' },
    { name: 'f', title: 'LOAN' },
    { name: 'g', title: 'OTHERS' },
  ];
  //ALL Element table
  tableColu = [
    { name: 'a', title: 'NAME/ID' },
    { name: 'b', title: 'DEPARTMENT' },
    { name: 'c', title: 'LOCATION' },
    { name: 'd', title: 'GRADE LEVEL' },
    { name: 'e', title: 'GRADE STEP' },
    { name: 'e', title: 'LEAVE' },
    { name: 'f', title: 'LOAN' },
    { name: 'g', title: 'LEAVE' },
  ];

  //table for deduction summary

  tableCol = [
    { name: 'a', title: 'ELEMENT NAME' },
    { name: 'b', title: 'AMOUNT' },
    { name: 'c', title: 'LOCATION' },
  
  ];

  //Table for payment summary
  tableCo = [
    { name: 'a', title: 'ELEMENT NAME' },
    { name: 'b', title: 'AMOUNT' },
    { name: 'c', title: 'LOCATION' },
  ];
  //Table for Tax
  tableC = [
    { name: 'a', title: 'NAME/ID' },
    { name: 'b', title: 'ID' },
    { name: 'b', title: 'ELEMENT NAME' },
    { name: 'b', title: 'AMOUNT' },
    { name: 'c', title: 'LOCATION' },

  ];
  //Table for pension
  table = [
    { name: 'a', title: 'NAME/ID' },
    { name: 'b', title: 'PFA CODE' },
    { name: 'c', title: 'PFA NAME' },
    { name: 'd', title: 'PENSION PIN' },
    { name: 'e', title: 'PERIOD NAME' },
    { name: 'e', title: 'EMPLOYEE CONTRIBUTION' },
    { name: 'f', title: 'REMITANCE' },
    
  ];
  //Table for payslip analysis
  tab = [
    { name: 'a', title: 'NAME' },
    { name: 'b', title: 'ASSIGNMENT NO' },
    { name: 'c', title: 'PFA NAME' },
    { name: 'd', title: 'TOTAL CURRENT EARNING' },
    { name: 'e', title: 'TOTAL PREVIOUS EARNING' },
    { name: 'e', title: 'PERCENTAGE EARNING DIFF' },
    { name: 'f', title: 'TOTAL CURRENT DEDUCTION' },
    
  ];

  data = [{

  }]

  tableActions: TableAction[] = [
    { name: TABLE_ACTION.VIEW, label: 'View' },

  ]

  constructor() { }

  ngOnInit(): void {
  }

  tableActionClicked(event: TableActionEvent) {
    //   if(event.name==TABLE_ACTION.DELETE){
    //     this.showdeleteModal = true
    //     }
    //     if(event.name==TABLE_ACTION.EDIT){
    //       this.router.navigateByUrl('/payroll/editpayment')
    //     }
    if (event.name == TABLE_ACTION.VIEW) {
      this.showViewModal = true
    }
  }
}
