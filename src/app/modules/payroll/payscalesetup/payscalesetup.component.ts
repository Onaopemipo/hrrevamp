import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TableAction, TableActionEvent } from 'app/components/tablecomponent/models';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { AddUpdatePayScaleServiceProxy,GetPayrollTypeByIdServiceProxy, CommonServiceProxy, EmployeeDTO, FrequencyRule, GetAllPayElementsServiceProxy, IDTextViewModel, ManagePayrollTypeDTO, RemoveEmployeeFromPayScaleServiceProxy } from 'app/_services/service-proxies';
interface Fields {
  id?: number,
  name?: string
}

enum TABLE_ACTION {
  VIEW = '1',
  DELETE = '2',
  EDIT = '3'
}
@Component({
  selector: 'ngx-payscalesetup',
  templateUrl: './payscalesetup.component.html',
  styleUrls: ['./payscalesetup.component.scss']
})
export class PayscalesetupComponent implements OnInit {
  payScaleForm: FormGroup;
  ManagePayrollType = new ManagePayrollTypeDTO().clone();
  payElement: IDTextViewModel[] = [];
  allfrequency: FrequencyRule[] = [];
  selectedEmployee: EmployeeDTO[] = [];
  allowmultipleselection = true;
  selectionHeader = "Add Employee";
  addbtnText = "select employee"
  ElementList = []

  tableColumns  = [
    { name: 'fullName', title: 'Name' },
    { name: 'employeeNumber', title: 'Empoyee Number' },
    { name: 'department', title: 'DEPARTMENT' },
    { name: 'grade', title: 'DESIGNATION' },
  ]
  tableActions: TableAction[] = [
    {name: TABLE_ACTION.DELETE, label: 'Delete'},
  ]

  loadingPayScale = false;
  selElem: any = '';
  master_search_clear_flag = 0;
  existingPayType = false;
  loadingeXistingType = false;
  totalItems = 0;
  currentPage = 0;
  employees = [];
  constructor(private CommonService: CommonServiceProxy,
    private GetAllPayElementsService: GetAllPayElementsServiceProxy,
    private AddUpdatePayScaleService: AddUpdatePayScaleServiceProxy,
    private router: Router,
    private activatedroute: ActivatedRoute,
  private alertService: AlertserviceService,
    private GetPayrollTypeByIdService: GetPayrollTypeByIdServiceProxy,
    private RemoveEmployeeFromPayScaleService: RemoveEmployeeFromPayScaleServiceProxy) { }
  get showEmpty() {
    return this.employees.length === 0;
  }
  tableActionClicked(event: TableActionEvent) {      
      if(event.name == TABLE_ACTION.DELETE){
        this.alertService.openModalAlert(this.alertService.ALERT_TYPES.CONFIRM, event.data.fullName, 'Yes').subscribe(data => {
          if (data == "closed") {
            this.deleteEmployeeFromPayType(this.ManagePayrollType.id,event.data.contractId);
          }
  
        })
      }  
  }
  deleteEmployeeFromPayType(payScaleId, contractId) {
    this.loadingeXistingType = true;
    this.RemoveEmployeeFromPayScaleService.removeEmployeeFromPayScale(payScaleId,contractId).subscribe(data => {
      this.loadingeXistingType = false;
      if (!data.hasError) {
        this.alertService.openModalAlert(this.alertService.ALERT_TYPES.SUCCESS, data.message, "ok");
        this.getPayTypeDetails();
      } else {
        this.alertService.openModalAlert(this.alertService.ALERT_TYPES.FAILED, data.message, "ok");
    }
  })
  }
  getPayTypeDetails() {
    this.loadingeXistingType = true;
    this.GetPayrollTypeByIdService.getPayrollType(this.ManagePayrollType.id).subscribe((data) => {
      this.loadingeXistingType = false;
      if (!data.hasError) {
        this.employees = data.result.employees;
        this.ManagePayrollType.name = data.result.name;
        this.ManagePayrollType.frequencyRuleId = data.result.frequencyRuleId;
        this.ManagePayrollType.firstPeriodEndDate = data.result.firstPeriodEndDate;
        this.ManagePayrollType.effectiveDate = data.result.effectiveDate;

        console.log(this.ManagePayrollType);
    }
  })
}
  addPayElement(Ele) {
  //  console.log(Ele)
    var getEle = this.payElement.find(ge => ge.id == Ele);
    if (getEle) {
      var ddChk = this.ElementList.find(e => e.id == getEle.id);
      if (!ddChk) {
        this.ElementList.push(getEle);
     //   console.log(this.ElementList)
      } 
    }

 
}
  goback() {
    this.router.navigate(['/payroll/payscaletable'])
}
  onDelete(list) {
    this.ElementList = this.ElementList.filter(Eli => {
      Eli.id !== list.id
    })
  }
  
  modal(event){

  }
  async getPayElements() {
    var pElemnt =await this.CommonService.getPayElements().toPromise();
    if (!pElemnt.hasError) {
      this.payElement = pElemnt.result;
    }
  }
  async getFrequencies() {
    var pFreq = await this.CommonService.getFrequencies().toPromise();
    if (!pFreq.hasError) {
      this.allfrequency = pFreq.result;
    }
  }
  ngOnInit(): void {

    this.getPayElements();
    this.getFrequencies();
    this.activatedroute.queryParams.subscribe(data => {
      if (data.id) {
        this.ManagePayrollType.id = data.id;
        this.existingPayType = true;
        this.getPayTypeDetails();

  }
})
  }
  getSelectedEmployee(event:EmployeeDTO[]) {
    this.selectedEmployee = event;
  }
  savePayrollScale() {
    this.loadingPayScale = true;
    var elList = [];
    var empList = "";
    // if (this.ElementList.length < 1) {
    //   this.alertService.openModalAlert(this.alertService.ALERT_TYPES.FAILED, "Please Add Pay Element", "ok");
    //   return
      
    // }
    if (this.selectedEmployee.length < 1) {
      this.alertService.openModalAlert(this.alertService.ALERT_TYPES.FAILED, 'Please add Employee to pay scale', "ok");
      this.loadingPayScale = false;
      return
    }
    // this.ElementList.forEach(value => {
    //   elList.push(value.id)
    // });
    this.selectedEmployee.forEach(val => {
      empList += val.employeeContractId + ",";
    })
  //  this.ManagePayrollType.payElements = JSON.stringify(elList);
    this.ManagePayrollType.employeeContracts = empList.substr(0,(empList.length - 1));
    this.AddUpdatePayScaleService.addUpdatePayScale(this.ManagePayrollType).subscribe(data => {
      this.loadingPayScale = false;
      if (!data.hasError) {
        this.getPayTypeDetails();
        this.alertService.openModalAlert(this.alertService.ALERT_TYPES.SUCCESS, data.message, "ok");
        this.ElementList = [];
        this.selectedEmployee = [];
        this.ManagePayrollType = new ManagePayrollTypeDTO().clone();
        this.master_search_clear_flag += 1;

      } else {
        this.alertService.openModalAlert(this.alertService.ALERT_TYPES.FAILED, data.message, "ok");
      }
    })
  }
}
