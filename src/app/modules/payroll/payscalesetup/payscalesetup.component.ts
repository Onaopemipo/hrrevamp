import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonServiceProxy, EmployeeDTO, FrequencyRule, GetAllPayElementsServiceProxy, IDTextViewModel } from 'app/_services/service-proxies';
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
  constructor(private CommonService: CommonServiceProxy,
    private GetAllPayElementsService: GetAllPayElementsServiceProxy) { }

  addPayElement(Ele) {
    var ddChk = this.ElementList.find(e => e.id == Ele.id);
    if (!ddChk) {
      this.ElementList.push(Ele);
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
}
