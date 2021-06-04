import { Component, OnInit } from '@angular/core';
import { TableAction, TableActionEvent } from 'app/components/tablecomponent/models';
import { GetAllElementsServiceProxy, GetBankScheduleServiceProxy, GetDeductionsServiceProxy, GetDeductionSummaryServiceProxy, GetEarningsServiceProxy, GetPaymentSummaryServiceProxy, GetPayslipAnalysisServiceProxy, GetPensionDetailServiceProxy, GetTaxDetailServiceProxy } from 'app/_services/service-proxies';


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
    { name: 'employeeName', title: 'NAME' },
    { name: 'employeeNo', title: 'EMPLOYEE NUMBER' },
    { name: 'elementName', title: 'ITEM NAME' },  
    { name: 'amount', title: 'AMOUNT' },
    { name: 'locationName', title: 'LOCATION NAME' },
    // { name: 'b', title: 'DEPARTMENT' },
    // { name: 'c', title: 'LOCATION' },
    // { name: 'd', title: 'GRADE LEVEL' },
    // { name: 'e', title: 'GRADE STEP' },
    // { name: 'e', title: 'LEAVE' },
    // { name: 'f', title: 'BONUS' },
    // { name: 'g', title: 'OTHERS' },
  ];
  //Deduction Table
  deductiontableColum = [
    { name: 'employeeName', title: 'NAME' },
    { name: 'employeeNo', title: 'EMPLOYEE NUMBER' },
    { name: 'elementName', title: 'ITEM NAME' },  
    { name: 'amount', title: 'AMOUNT' },
    { name: 'locationName', title: 'LOCATION NAME' },
    // { name: 'a', title: 'NAME/ID' },
    // { name: 'b', title: 'DEPARTMENT' },
    // { name: 'c', title: 'LOCATION' },
    // { name: 'd', title: 'GRADE LEVEL' },
    // { name: 'e', title: 'GRADE STEP' },
    // { name: 'e', title: 'LEAVE' },
    // { name: 'f', title: 'LOAN' },
    // { name: 'g', title: 'OTHERS' },
  ];
  //ALL Element table
  allElementtableColumn = [
    { name: 'employeeName', title: 'NAME' },
    { name: 'employeeNo', title: 'EMPLOYEE NUMBER' },
    { name: 'elementName', title: 'ITEM NAME' },  
    { name: 'amount', title: 'AMOUNT' },
    { name: 'locationName', title: 'LOCATION NAME' },
    // { name: 'a', title: 'NAME/ID' },
    // { name: 'b', title: 'DEPARTMENT' },
    // { name: 'c', title: 'LOCATION' },
    // { name: 'd', title: 'GRADE LEVEL' },
    // { name: 'e', title: 'GRADE STEP' },
    // { name: 'e', title: 'LEAVE' },
    // { name: 'f', title: 'LOAN' },
    // { name: 'g', title: 'LEAVE' },
  ];

  //table for deduction summary

  deductionSummarytableCol = [
    { name: 'sn', title: 'S/N' },
    { name: 'elementName', title: 'ELEMENT NAME' },
    { name: 'amount', title: 'AMOUNT' },
    //{ name: 'c', title: 'LOCATION' },
  
  ];

  //Table for payment summary
  paymentSummarytableCo = [
    { name: 'sn', title: 'S/N' },
    { name: 'elementName', title: 'ELEMENT NAME' },
    { name: 'amount', title: 'AMOUNT' },
   // { name: 'c', title: 'LOCATION' },
  ];
  //Table for Tax
  taxtableC = [
    { name: 'employeeName', title: 'NAME' },
    { name: 'employeeNo', title: 'EMPLOYEE NUMBER' },
    { name: 'elementName', title: 'ELEMENT NAME' },
    { name: 'amount', title: 'AMOUNT' },
    { name: 'location', title: 'LOCATION' },

  ];
  //Table for pension
  pensiontable = [
    { name: 'employeeName', title: 'NAME' },
    { name: 'employeeNo', title: 'EMPLOYEE NUMBER' },
    { name: 'pfaCode', title: 'PFA CODE' },
    { name: 'pfaName', title: 'PFA NAME' },
    { name: 'pensionPIN', title: 'PENSION PIN' },
    { name: 'periodName', title: 'PERIOD NAME' },
    { name: 'employeeContribution', title: 'EMPLOYEE CONTRIBUTION' },
    { name: 'employerContribution', title: 'EMPLOYER CONTRIBUTION' },
    { name: 'remittance', title: 'REMITANCE' },
    
  ];
  //Table for payslip analysis
  paySliptab = [
    { name: 'employeeName', title: 'NAME' },
    { name: 'employeeContractId', title: 'EMPLOYEE CONTRACT ID' },
    { name: 'assignmentNo', title: 'ASSIGNMENT NO' },   
    { name: 'totalCurrentEarning', title: 'TOTAL CURRENT EARNING' },
    { name: 'totalPreviousEarning', title: 'TOTAL PREVIOUS EARNING' },
    { name: 'percentageDiff', title: 'PERCENTAGE EARNING DIFF' },
    { name: 'totalCurrentDeduction', title: 'TOTAL CURRENT DEDUCTION' },    
  ];



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
    private getEarningsService: GetEarningsServiceProxy,
    private GetDeductionsService:GetDeductionsServiceProxy,
    private GetAllElementsService: GetAllElementsServiceProxy,
    private GetDeductionSummaryService: GetDeductionSummaryServiceProxy,
  private GetPaymentSummaryService: GetPaymentSummaryServiceProxy,
    private GetTaxDetailService: GetTaxDetailServiceProxy,
    private GetPensionDetailService: GetPensionDetailServiceProxy,
  private GetPayslipAnalysisService :GetPayslipAnalysisServiceProxy) { }

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

  async getDeductions() {
    this.defPageHeader = "Deductions";
    this.defpageDescription = "no record found";
    this.showActions = false;
    this.loading = true;
    var data = await this.GetDeductionsService.getDeductions(undefined).toPromise();
    if (!data.hasError) {
      this.loading = false;
      this.alldata = data.result;
      this.totalItems = data.totalRecord;
      this.tableColumns = this.deductiontableColum;
    } else {
      this.loading = false;
    }
  }
  async getAllElement() {
    this.defPageHeader = "All Element Sheet";
    this.defpageDescription = "no record found";
    this.showActions = false;
    this.loading = true;
    var data = await this.GetAllElementsService.getAllElements(undefined).toPromise();
    if (!data.hasError) {
      this.loading = false;
      this.alldata = data.result;
      this.totalItems = data.totalRecord;
      this.tableColumns = this.allElementtableColumn;
    } else {
      this.loading = false;
    }
  }

  async getDuductionSummary() {
    this.defPageHeader = "Deduction Summary";
    this.defpageDescription = "no record found";
    this.showActions = false;
    this.loading = true;
    var data = await this.GetDeductionSummaryService.getDeductionSummary(undefined).toPromise();
    if (!data.hasError) {
      this.loading = false;
      this.alldata = data.result;
      this.totalItems = data.totalRecord;
      this.tableColumns = this.deductionSummarytableCol;
    } else {
      this.loading = false;
    }
  }

  async getPaymentSummary() {
    this.defPageHeader = "Payment Summary";
    this.defpageDescription = "no record found";
    this.showActions = false;
    this.loading = true;
    var data = await this.GetPaymentSummaryService.getPaymentSummary(undefined).toPromise();
    if (!data.hasError) {
      this.loading = false;
      this.alldata = data.result;
      this.totalItems = data.totalRecord;
      this.tableColumns = this.paymentSummarytableCo;
    } else {
      this.loading = false;
    }
  }

  async getTaxDetails() {
    this.defPageHeader = "Payment Summary";
    this.defpageDescription = "no record found";
    this.showActions = false;
    this.loading = true;
    var data = await this.GetTaxDetailService.getTaxDetail(undefined).toPromise();
    if (!data.hasError) {
      this.loading = false;
      this.alldata = data.result;
      this.totalItems = data.totalRecord;
      this.tableColumns = this.taxtableC;
    } else {
      this.loading = false;
    }
  }

  async getPensionDetail() {
    this.defPageHeader = "Pension Details";
    this.defpageDescription = "no record found";
    this.showActions = false;
    this.loading = true;
    var data = await this.GetPensionDetailService.getPensionDetail(undefined).toPromise();
    if (!data.hasError) {
      this.loading = false;
      this.alldata = data.result;
      this.totalItems = data.totalRecord;
      this.tableColumns = this.pensiontable;
    } else {
      this.loading = false;
    }
  }

  async getPayslipAnalysis() {
    this.defPageHeader = "Payslip Analysis";
    this.defpageDescription = "no record found";
    this.showActions = false;
    this.loading = true;
    var data = await this.GetPayslipAnalysisService.getPayslipAnalysis(undefined).toPromise();
    if (!data.hasError) {
      this.loading = false;
      this.alldata = data.result;
      this.totalItems = data.totalRecord;
      this.tableColumns = this.paySliptab;
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
        this.getEarnings();
        break;
      case "Deduction":
        this.getDeductions()
        break;    
      case "All Element Sheet":
        this.getAllElement();
        break;
      case "Deduction Summary":
        this.getDeductions();
        break;
      case "Payment Summary":
        this.getPaymentSummary();
        break;
      case "Tax Detail":
        this.getTaxDetails();
        break;
      case "Pension Details":
        this.getPensionDetail();
        break;
      case "Payslip Analysis":
      this.getPayslipAnalysis();
      break;
    }
  }
}
