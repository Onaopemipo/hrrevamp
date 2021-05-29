import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { AddUpdatePayScaleServiceProxy, CommonServiceProxy, EmployeeDTO, FrequencyRule, GetAllPayElementsServiceProxy, IDTextViewModel, ManagePayrollTypeDTO } from 'app/_services/service-proxies';
interface Fields {
  id?: number,
  name?: string
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
    { name: 'a', title: 'NAME' },
    { name: 'b', title: 'ID' },
    { name: 'c', title: 'DEPARTMENT' },
    { name: 'd', title: 'DESIGNATION' },
  ]
  topActionButtons = [
    
  ]
  loadingPayScale = false;
  selElem: any = '';
  constructor(private CommonService: CommonServiceProxy,
    private GetAllPayElementsService: GetAllPayElementsServiceProxy,
    private AddUpdatePayScaleService: AddUpdatePayScaleServiceProxy,
  private alertService: AlertserviceService) { }

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
  }
  getSelectedEmployee(event:EmployeeDTO[]) {
    this.selectedEmployee = event;
  }
  savePayrollScale() {
    this.loadingPayScale = true;
    var elList = [];
    var empList = [];
    if (this.ElementList.length < 1) {
      this.alertService.openModalAlert(this.alertService.ALERT_TYPES.FAILED, "Please Add Pay Element", "ok");
      return
      
    }
    if (this.selectedEmployee.length < 1) {
      this.alertService.openModalAlert(this.alertService.ALERT_TYPES.FAILED, 'Please add Employee to pay scale', "ok");
      return
    }
    this.ElementList.forEach(value => {
      elList.push(value.id)
    });
    this.selectedEmployee.forEach(val => {
      empList.push(val.employeeContractId);
    })
    this.ManagePayrollType.payElements = JSON.stringify(elList);
    this.ManagePayrollType.employeeContracts = JSON.stringify(empList);
    this.AddUpdatePayScaleService.addUpdatePayScale(this.ManagePayrollType).subscribe(data => {
      this.loadingPayScale = false;
      if (!data.hasError) {
        this.alertService.openModalAlert(this.alertService.ALERT_TYPES.SUCCESS, data.message, "ok");
        this.ElementList = [];
        this.selectedEmployee = [];
        this.ManagePayrollType = new ManagePayrollTypeDTO().clone();
      } else {
        this.alertService.openModalAlert(this.alertService.ALERT_TYPES.FAILED, data.message, "ok");
      }
    })
  }
}
