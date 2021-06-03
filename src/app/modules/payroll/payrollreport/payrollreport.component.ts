import { Component, OnInit } from '@angular/core';
import { TableAction, TableActionEvent } from 'app/components/tablecomponent/models';
import { GetBankScheduleServiceProxy, GetEarningsServiceProxy } from 'app/_services/service-proxies';


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
  tableColumns = [];
  //BANK TABLE
  bankColumn = [
    { name: 'fullName', title: 'NAME' },
    { name: 'employeeNo', title: 'EMPLOYEE NUMBER' },
    { name: 'accountNo', title: 'ACCOUNT NO' },
    { name: 'dept', title: 'DEPARTMENT' },
    { name: 'bankName', title: 'BANK NAME' },
    { name: 'gradeLevel', title: 'GRADE LEVEL' },
    { name: 'location', title: 'LOCATION' },   
    // { name: 'e', title: 'EARNINGS' },
    // { name: 'e', title: 'DEDUCTIONS' },
    // { name: 'f', title: 'NET PAY' },
    // { name: 'g', title: 'INSTITUTION' },
  ];
  //EARNINGS TABLE
  earningtableColumn = [
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
  alldata = [];
  defPageHeader = "";
  defpageDescription = "";
  loading = false;
  totalItems = 0;
  currentPage = 1;
  showActions = false;
  constructor(private GetBankScheduleService: GetBankScheduleServiceProxy,
    private getEarningsService: GetEarningsServiceProxy) { }

  ngOnInit(): void {
    this.getBankSchedule();
  }
  get showEmpty() {
    return this.alldata.length === 0;
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

  async getBankSchedule() {
    this.defPageHeader = "Banks Schedule";
    this.defpageDescription = "no record found";
    this.showActions = true;
    this.loading = true;
    var data = await this.GetBankScheduleService.getBankSchedule(undefined).toPromise();
    if (!data.hasError) {
      this.loading = false;
      this.alldata = data.result;
      this.totalItems = data.totalRecord;
      this.tableColumns = this.bankColumn;
    } else {
      this.loading = false;
    }
  }

  async getEarnings() {
    this.defPageHeader = "Earning";
    this.defpageDescription = "no record found";
    this.showActions = false;
    this.loading = true;
    var data = await this.getEarningsService.getEarnings(undefined).toPromise();
    if (!data.hasError) {
      this.loading = false;
      this.alldata = data.result;
      this.totalItems = data.totalRecord;
      this.tableColumns = this.earningtableColumn;
    } else {
      this.loading = false;
    }
  }

  filterLeavePlan(is_approved = []) {
   
    let tabtittle = "";
    is_approved.forEach(value => {
      if (value.activeValue) tabtittle = value.tabTitle;
    });
    console.log(tabtittle);

    switch(tabtittle) {
      case "Bank Schedule":
        this.getBankSchedule();
        break;
      case "Earning":
        this.getEarnings()
        break;
    
    }
  }
}
