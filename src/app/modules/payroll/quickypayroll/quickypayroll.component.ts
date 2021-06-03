import { Component, OnInit } from '@angular/core';
import { TableAction, TableActionEvent } from 'app/components/tablecomponent/models';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { CommonServiceProxy, IDTextViewModel,QuickPayrollServiceProxy,EmployeeProfileDTO, EmployeePayrollBenefitDTO, ProcessQuickPayrollDTO } from 'app/_services/service-proxies';


export class empiWithChecked extends EmployeeProfileDTO  {
  eliWithSt: EmployeeProfileDTO;
  is_selected: boolean;
  constructor(eliWithSt: EmployeeProfileDTO) {
    super(eliWithSt);
    this.eliWithSt = eliWithSt;
    }

}
enum TOP_ACTIONS {
  APPLY_FOR_LEAVE,
  INITIATE_VOLUNTARY_EXIT
}

enum TABLE_ACTION {
  VIEW = '1',
  DELETE = '2',
  EDIT = '3'
}


@Component({
  selector: 'ngx-quickypayroll',
  templateUrl: './quickypayroll.component.html',
  styleUrls: ['./quickypayroll.component.scss']
})
export class QuickypayrollComponent implements OnInit {
  title = "Payroll Type"
  topActionButtons = [
    { name: 'runpayroll', label: 'Run Payroll', 'icon': '', outline: false },
  ];
  showViewModal: boolean = false

  tableColumns = [
    { name: 'id', title: 'ID' },
    { name: 'employeeNumber', title: 'Employee No' },
    { name: 'fullName', title: 'Name' },
    { name: 'salaryScale', title: 'Salary Scale' },
    { name: 'grade', title: 'Grade Level' },

  ]
  paydettableColumns = [
    { name: 'fullName', title: 'Name' },
    { name: 'salaryScaleName', title: 'Salary Scale' },
    { name: 'gradeName', title: 'Grade Level' },
    { name: 'totalEarnings', title: 'Total Earnings' },
    { name: 'totalDeductions', title: 'Total Deduction' },
    { name: 'netPayment', title: '	Net Payment' },
  ]

  tableActions: TableAction[] = [
    { name: TABLE_ACTION.VIEW, label: 'Pay Element' },
    { name: TABLE_ACTION.EDIT, label: 'Salary Scale' },
  ]
  data = [{

  }]
  selectedPanel: string = '';
  activatePayDetails = false;
  activateProcessPay = false;
  allpayrollType: IDTextViewModel[] = [];
  allpayPeriod: IDTextViewModel[] = [];
  EmployeeProfile = [];
  totalItems = 0;
  currentPage = 1;
  loading = false;
  showCheckBox: boolean = true;
  selectedEmployee: EmployeeProfileDTO[] = [];
  selectedEmplContIds: string ='';
  payrollTypeId?: any=0;
  EmployeePayrollBenefitDTO: EmployeePayrollBenefitDTO[] = [];
  paydloading = false;
  paydtotalItems = 0;
  paydcurrentPage = 1;
  totalEarnings = 0;
  totalDeduction = 0;
  NetPay = 0;
  ProcessQuickPayrollDTO = new ProcessQuickPayrollDTO().clone();
  payPeriodId = 0;
  payrollProcessloading = false;
  constructor(private alertController: AlertserviceService,private QuickPayrollService: QuickPayrollServiceProxy,
    private commoService: CommonServiceProxy) { }
  processQuickPayroll() {
    this.payrollProcessloading = true;
    this.ProcessQuickPayrollDTO.payrollTypeId = this.payrollTypeId;
    this.ProcessQuickPayrollDTO.payPeriodId = this.payPeriodId;
    this.ProcessQuickPayrollDTO.contractIds = this.selectedEmplContIds.substr(0, (this.selectedEmplContIds.length - 1));
    this.QuickPayrollService.processQuickPayroll(this.ProcessQuickPayrollDTO).subscribe(data => {
      this.payrollProcessloading = false;
      if (!data.hasError) {
        this.ProcessQuickPayrollDTO = new ProcessQuickPayrollDTO().clone();
        this.payPeriodId = 0;
        this.payrollTypeId = 0;
        this.selectedEmplContIds = '';
        this.selectedEmployee = [];
        this.EmployeeProfile = [];
        this.selectedPanel = 'payrollType';
        this.alertController.openModalAlert(this.alertController.ALERT_TYPES.SUCCESS, data.message, 'OK');
      } else {
        this.alertController.openModalAlert(this.alertController.ALERT_TYPES.FAILED, data.message, 'OK');
      }
    })
  }
  proceedtoProcessPayroll() {
    if (this.EmployeePayrollBenefitDTO.length > 0) {
      this.title = "Process Payroll";
      this.selectedPanel = "processPayroll";
      this.EmployeePayrollBenefitDTO.forEach(val => {
        this.totalEarnings += val.totalEarnings;
        this.totalDeduction += val.totalDeductions;
        this.NetPay += val.netPayment;
      });
      this.activateProcessPay = true;
    } else {
      this.alertController.openModalAlert(this.alertController.ALERT_TYPES.FAILED, "Pqyroll Details is Empty", 'OK');
      return;
      }
    }
  get paydshowEmpty() {
    return this.EmployeePayrollBenefitDTO.length === 0;
  }
 async proceedtoPayrollDetails() {
    if (this.payrollTypeId && this.payrollTypeId > 0 ) {
      if (this.selectedEmployee.length > 0) {
        this.title = "Payroll Details";
        this.selectedPanel = "payrollDetails";
        this.selectedEmployee.forEach(val => {
          this.selectedEmplContIds += val.employeeContractId + ",";
        });
        this.paydloading = true;     
        
      var data = await  this.QuickPayrollService.fetchEmployeePayElementBenefits( this.selectedEmplContIds.substr(0,(this.selectedEmplContIds.length - 1))).toPromise()
        if (!data.hasError) {
          this.paydloading = false;
          this.EmployeePayrollBenefitDTO = data.result;
          this.paydtotalItems = data.totalRecord;
        } else {
          this.paydloading = false;
      }
        this.activatePayDetails = true;
      } else {
        this.alertController.openModalAlert(this.alertController.ALERT_TYPES.FAILED, "Please Select Employee", 'OK');   
      }
  
    } else {
      this.alertController.openModalAlert(this.alertController.ALERT_TYPES.FAILED, "Please Select Payroll Type", 'OK');
      return;
    }
  
  }
  tableActionChecked(event: TableActionEvent) {
    var searchInd = this.selectedEmployee.findIndex(x => x.employeeContractId == event.data.employeeContractId);
    if (searchInd == -1) {
      this.selectedEmployee.push(event.data);
    } else {
      this.selectedEmployee.splice(searchInd,1)
 }
   

    }
    tableBulkActionClicked(event: TableActionEvent) {
      if (event.data) {
        this.EmployeeProfile.map(e => {
          e.is_selected = true;
          this.selectedEmployee.push(e);
          return e;
        })
      } else {
        this.EmployeeProfile.map(e => {
          e.is_selected = false;
          this.selectedEmployee = [];
          return e;
        })
      }

    }
  get showEmpty() {
    return this.EmployeeProfile.length === 0;
  }
  async getEmployeebyparolltype(payrolltypeId) {
    this.loading = true;
    var data = await this.QuickPayrollService.fetchPayrollTypeEmployees(payrolltypeId).toPromise();
    if (!data.hasError) {
      this.loading = false;
      this.EmployeeProfile = data.result.map(r => {
        let nv = new empiWithChecked(r);
        nv.is_selected = false;
        return nv;
      });
      this.totalItems = data.totalRecord;
    } else {
      this.loading = false;
    }
  }

  gotoPanel(paneltitle, wizardtitle) {
    if (paneltitle == 'payrollDetails' && !this.activatePayDetails)
    {
      this.alertController.openModalAlert(this.alertController.ALERT_TYPES.FAILED, "Please Complete Payroll Type", 'OK');
      return;
    }
    if (paneltitle == 'processPayroll' && !this.activateProcessPay)
    {
      this.alertController.openModalAlert(this.alertController.ALERT_TYPES.FAILED, "Please Complete Payroll Details", 'OK');
      return;
    }
     
    this.title = wizardtitle;
    this.selectedPanel = paneltitle;
   
  }

 async getPayrollType() {
   var data = await this.commoService.getPayrollTypes().toPromise();
   if (!data.hasError) {
     this.allpayrollType = data.result;
   }
  }
  async getpayPeriod() {
    var data = await this.commoService.getPayPeriods().toPromise();
    if (!data.hasError) {
      this.allpayPeriod = data.result;
    }
  }
  ngOnInit(): void {
    this.getPayrollType();
    this.getpayPeriod();
    this.selectedPanel = 'payrollType';
  }
  modal(event) {
    if (event == "runpayroll") {
  
}
  }

  tableActionClicked(event: TableActionEvent) {
    if (event.name == TABLE_ACTION.VIEW) {
      this.showViewModal = true
    }
  }
}



