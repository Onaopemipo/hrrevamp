import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IStatus, MyColor } from 'app/components/status/models';
import { ACTIONS, ColumnTypes, TableAction, TableActionEvent } from 'app/components/tablecomponent/models';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { CommonServiceProxy, ElementInputValueDTO, AddUpdateElementInputValuesServiceProxy,EmployeeDTO, EmployeeElementLinkDTO, GetEmployeeElementLinksServiceProxy, PayElementDTO, RefreshEmployeeElementLinkServiceProxy, SearchEmployeesServiceProxy, ManageElementInputValueDTO, GetElementInputValuesServiceProxy } from 'app/_services/service-proxies';
export class EmployeeWithStatus extends EmployeeDTO implements IStatus {
  employee: EmployeeDTO;
  employeeName: string;
  constructor(employee: EmployeeDTO) {
    super(employee);
    this.employee = employee;

  }
  get status() {
    return this.employee.employmentStatusId;
  }
  getStatusLabel() {

    if (this.employee.isActive) return 'Active';
    if (!this.employee.isActive) return 'InActive';

  }
  getStatusColor() {
    if (this.employee.isActive) return new MyColor(0, 153, 74);
    if (!this.employee.isActive) return new MyColor(242, 0, 74);
    return new MyColor(253, 238, 238);
  }
}
@Component({
  selector: 'ngx-payrollcontract',
  templateUrl: './payrollcontract.component.html',
  styleUrls: ['./payrollcontract.component.scss']
})
export class PayrollcontractComponent implements OnInit {
  newIputValForm: FormGroup;
  pageName: string = "Employee Contract";
  selectedEmployee = new EmployeeDTO().clone();
  topActionButtons = [
    { name: 'search', label: 'Search Employee', 'icon': '', outline: false },
  ];
  tableColumns = [
    { name: 'employeeNumber', title: 'Employee No', type: ColumnTypes.Text },
    { name: 'employeeName', title: 'Employee Name', type: ColumnTypes.Text },
    { name: 'employeeContractId', title: 'Contract No', type: ColumnTypes.Text },
    { name: 'dateCreated', title: 'Appointment', type: ColumnTypes.Date },
    { name: 'isActive', title: 'Status', type: ColumnTypes.Status },
  ];
  tableActions: TableAction[] = [
    { name: ACTIONS.EDIT, label: 'Payslips' },
    { name: ACTIONS.VIEW, label: 'Element Links' },
    { name: ACTIONS.DELETE, label: 'Exclude From Payroll' },
  ];
  showMasterSearch = false;
  allEmployeeContract = [];
  loading = false;
  allDepartment = [];
  allLocation = [];
  allJobRole = [];
  allGrade = [];
  allsalaryScale = [];
  
  totalItems = 0;
  currentPage = 1;
  filterObject: {
    searchDepartment?: number;
    searchLocation?: number;
    searchJobRole?: number;
    saerchGrade?: number
    searchPeopleGroup?: number;
  searchtText?: string;
    pageSize?: number;

    companyId?: number;
    searchType?: number;
    ministryId?: number;
    salaryscaleId?: number;
    gradestepId?: number;
    gradeId?: number;

}={searchDepartment:0,searchLocation:0,searchJobRole:0,saerchGrade:0,searchPeopleGroup:0,searchtText:'a',pageSize:1000,salaryscaleId:0};
  showEmployeeLinkModal = false;
  EmployeeElementLink = new EmployeeElementLinkDTO().clone();
  elementLinks: PayElementDTO[] = [];
  elementInputValues: ElementInputValueDTO[] = [];
  newInputVal = new ElementInputValueDTO().clone();
  loadinglinks = false
  linktotalItems = 0;
  linkcurrentPage = 1;
  linktableColumns= [
    { name: 'name', title: 'Name', type: ColumnTypes.Text },
    { name: 'description', title: 'Description', type: ColumnTypes.Text },
    { name: 'is_reoccuring', title: 'Is Re-Occurring', type: ColumnTypes.Text },
    { name: 'is_enrolled', title: 'Is Enrolled', type: ColumnTypes.Text },

  ];
  linktableActions: TableAction[] = [
    { name: ACTIONS.EDIT, label: 'Input Values' },
    { name: ACTIONS.DELETE, label: 'Un-Enroll' },
  ];
  selectedElementlink = new PayElementDTO().clone();
  showLinkInputModal = false;
  showAddNewInput = false;
  newsaveInputValue = new ManageElementInputValueDTO().clone();
  loadingElementInput = false;
  constructor(private allemployeeServices: SearchEmployeesServiceProxy, private alertservice: AlertserviceService,
    private CommonService: CommonServiceProxy,private RefreshEmployeeElementLinkService: RefreshEmployeeElementLinkServiceProxy,
    private GetEmployeeElementLinksService: GetEmployeeElementLinksServiceProxy,
    private AddUpdateElementInputValuesService: AddUpdateElementInputValuesServiceProxy,
    private GetElementInputValuesService: GetElementInputValuesServiceProxy) { }
  
  saveInputValue() {
    this.loadingElementInput = true
    this.newsaveInputValue.elementId = this.selectedElementlink.id;
    this.newsaveInputValue.contractId = this.selectedEmployee.employeeContractId;
    this.newsaveInputValue.element_link_start_date = this.selectedElementlink.start_date;
    this.newsaveInputValue.element_link_end_date =  this.selectedElementlink.end_date;
    this.newsaveInputValue.elementInputValues = JSON.stringify(this.elementInputValues);
    this.AddUpdateElementInputValuesService.addUpdateElementInputValues(this.newsaveInputValue).subscribe(data => {
      this.loadingElementInput = false
      if (!data.hasError) {
        this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.SUCCESS, data.message, "Ok");
        this.newsaveInputValue = new ManageElementInputValueDTO().clone();
        this.getElementInputValues();
      } else {
        this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.FAILED,data.message,"Ok")
      }
    })
  }
  getElementInputValues() {
    this.GetElementInputValuesService.getElementInputValues(this.selectedElementlink.id, this.selectedEmployee.employeeContractId).subscribe(data => {
      if (!data.hasError) {
        this.elementInputValues = data.result.elementInputValues;
      }
    })
  }
  
  addInputValues() {
    var sChk = this.elementInputValues.find(x => x.elementInputName == this.newInputVal.elementInputName);
    if (!sChk) {
      this.newInputVal.elementId = this.selectedElementlink.id;
      this.newInputVal.elementName = this.selectedElementlink.name;
      this.newInputVal.employeeId = this.selectedEmployee.id;
      this.newInputVal.employeeContractId = this.selectedEmployee.employeeContractId;
      this.newInputVal.isSystemDefault = false;
      this.elementInputValues.push(this.newInputVal);
      this.newInputVal = new ElementInputValueDTO().clone();
      this.showAddNewInput = false;
    } else {
      this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.FAILED,"Input Name Exist","Ok")
    }
    }
  setInputValue(index, value) {
    var val = value.srcElement.value;
    this.elementInputValues[index].inputValue = val;
  }
  setOutputValue(index, value) {
    var val = value.srcElement.value;
    this.elementInputValues[index].outputValue = val;
  }
  get linkshowEmpty() {
    return this.elementLinks.length === 0;
   }
  refreshLinks() {
    this.loadinglinks = true;
      this.RefreshEmployeeElementLinkService.refreshEmployeeElementLink(this.selectedEmployee.employeeContractId).subscribe(data => {
        this.loadinglinks = false;
        if (!data.hasError) {
          this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.SUCCESS, data.message, 'OK');
          this.getEmployeeElementLink();
        } else {
          this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.FAILED, data.message, 'OK');   
     }
   })
    }
  getEmployeeElementLink() {
    this.loadinglinks = true;
    this.GetEmployeeElementLinksService.getEmployeeElementLinks(this.selectedEmployee.employeeContractId).subscribe(data => {
      this.loadinglinks = false;
      if (!data.hasError) {
        this.EmployeeElementLink = data.result;
        this.elementLinks = this.EmployeeElementLink.elementLinks;
        this.linktotalItems = this.elementLinks.length;
        console.log(this.EmployeeElementLink)
        this.elementInputValues =this.EmployeeElementLink.elementInputValues? this.EmployeeElementLink.elementInputValues:[];
      } else {
        
}
})
  }
  linktableActionClicked(event: TableActionEvent) {
    if (event.name == "1") {
      this.showLinkInputModal = true;
      this.selectedElementlink = event.data;
      this.getElementInputValues();
    }
    if (event.name == "2") {
      this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.ANYCONFIRM, event.data.yearName, 'Yes').subscribe(data => {
        if (data == "closed") {
       
        }

      })
    }
  }
  linkfilterUpdated(filter: any) {
    this.filterObject = { ...this.filterObject, ...filter };
  }
  tableActionClicked(event: TableActionEvent) {
    if (event.name == "3") {
      this.selectedEmployee = event.data;
      this.showEmployeeLinkModal = true;
      this.getEmployeeElementLink()
    }
      if (event.name == "1") {

      }
      if (event.name == "2") {
        this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.ANYCONFIRM, event.data.yearName, 'Yes').subscribe(data => {
          if (data == "closed") {
         
          }
  
        })
      }
    }
    filterUpdated(filter: any) {
      this.filterObject = { ...this.filterObject, ...filter };
      this.getallemployee();
    }
  get showEmpty() {
    return this.allEmployeeContract.length === 0;
  }
  modal(buttion) {
    if (buttion === 'search') {
      this.showMasterSearch = true;
    }
  }

  getallemployee(){
    this.loading = true;
      this.allemployeeServices.searchEmployees(this.filterObject.pageSize, this.filterObject.companyId,
        this.filterObject.searchtText, this.filterObject.searchPeopleGroup, this.filterObject.searchDepartment,
      this.filterObject.searchJobRole,this.filterObject.searchLocation,this.filterObject.salaryscaleId,this.filterObject.gradeId,this.filterObject.gradestepId).subscribe(data => {
    if(!data.hasError){
      this.allEmployeeContract = data.result.map(r => {
        let nr = new EmployeeWithStatus(r);
        nr.employeeName = r.firstName + " " + r.lastName;
        return nr;
      });
      this.totalItems = data.totalRecord;
      this.loading = false;
    }else{
    
    }
      })
      }


  
  getAllDepartment() {
    this.CommonService.getDepartments().subscribe(res => {
      if (!res.hasError) {
        this.allDepartment = res.result;
  }
})

  }
  getAllLocation() {
    this.CommonService.getLocations().subscribe(res => {
      if (!res.hasError) {
        this.allLocation = res.result;
  }
    })
  }
  getAllJobRole() {
    this.CommonService.getJobRoles().subscribe(res => {
      if (!res.hasError) {
        this.allJobRole = res.result;
  }
    })

  }
  getAllGrade() {
    this.CommonService.getGrades().subscribe(res => {
      if (!res.hasError) {
        this.allGrade = res.result;
  }
    })
  }
  getAllSalaryScale() {
    this.CommonService.getSalaryScale().subscribe(res => {
      if (!res.hasError) {
        this.allsalaryScale = res.result;
  }
    })
  }
  getAllPeoplesGroup() {

  }
  ngOnInit(): void {
    this.getAllDepartment();
    this.getAllLocation()
    this.getAllJobRole();
    this.getAllGrade();
    this.getAllPeoplesGroup();
    this.getallemployee()
  }

}
