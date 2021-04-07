import {
  EmployeeDTO,
  IEmployeeDTO, CreateEmployeeServiceProxy,
  FetchEmployeeByIdServiceProxy,
  DropdownValue, EmployeeBankDTO,DropdownValueDTO, DataServiceProxy, ManageEmployeeDTO, IDTextViewModel, EmployeeQualificationDTO,Document, NextOfKin
} from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { FlowDirective, Transfer } from '@flowjs/ngx-flow';
import { ColumnTypes, TableAction, TableActionEvent,ACTIONS } from 'app/components/tablecomponent/models';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ThreeColumnsLayoutComponent } from 'app/@theme/layouts';
@Component({
  selector: 'ngx-employeerecordsview',
  templateUrl: './employeerecordsview.component.html',
  styleUrls: ['./employeerecordsview.component.scss']
})
export class EmployeerecordsviewComponent implements OnInit {
  nxtKinForm: FormGroup;
  loading: boolean = false;
  title: string = "Employee Profile"
  selectedCase: string = 'profile_panel';
  selectedPanel: any ={ title: 'profile_panel', label: 'Profile', status: 'Active' };
  hiringChecklist = [
    { title: 'profile_panel', label: 'Profile', status: 'Active' },
    { title: 'contract_panel', label: 'Contract', status: 'Inactive' },
    { title: 'document_panel', label: 'Document Upload', status: 'Inactive' },
    { title: 'qualification_Info', label: 'Qualification', status: 'Inactive' },
    { title: 'bank_panel', label: 'Bank Profile', status: 'Inactive' },
    { title: 'kin_panel', label: 'Next of Kin', status: 'Inactive' },
    { title: 'contact_panel', label: 'Contact', status: 'Inactive' },
    { title: 'pension_panel', label: 'Pension', status: 'Inactive' },
    { title: 'History_panel', label: 'History', status: 'Inactive' },
    { title: 'skills_panel', label: 'Skills', status: 'Inactive' },
    { title: 'training_panel', label: 'Training', status: 'Inactive' },
    { title: 'certification_panel', label: 'Certifications', status: 'Inactive' },
    { title: 'custom_panel', label: 'Employee Custom Form', status: 'Inactive'},
  ];

  newEmployeeForm: NgForm;
  createNewEmployee: EmployeeDTO = new EmployeeDTO().clone();

  maritalStatusValues: DropdownValue[] = [];
  genderValues: DropdownValue[] = [];
  religionValues: DropdownValue[]  = [];
  employmentStatusValues: DropdownValue[]  = [];
  // allgender: string [] = [];
  showEmployeeContractModal: boolean = false;
  showdocumentUploadModal: boolean = false;
  showQualificationModal: boolean = false;
  showEmpHistoryModal: boolean = false;
  showSkillModal: boolean = false;
  showTrainingModal: boolean = false;
  showCertificationModal: boolean = false;
  trainingForm: FormGroup;
  certificationForm: FormGroup;
  skillForm: FormGroup;
  EmHistoryForm: FormGroup;
  showbankModal: boolean = false;
  contractForm: FormGroup;
  bankForm: FormGroup;
  documentUploadtForm: FormGroup;
  qualificationForm: FormGroup;
  allowmultipleselection: boolean = false;
  selectionHeader: string = "Select Employee";
  addbtnText: string = "Add Employee";
  btnContractSubmitted: boolean = false;
  files: Transfer[] = [];
  errorMsg: string = "";
  alldocTypes: IDTextViewModel[] = [];
  reqEmployee = new ManageEmployeeDTO().clone();
  newNextofKin = new NextOfKin().clone();
  profileOperations = [];

  tempQualificationList: EmployeeQualificationDTO[] = [];
  indvQualifications: EmployeeQualificationDTO;
  qualificationtotalItems = 0;
  qualificationcurrentPage = 1;
  get qualificationEmpty() {
    return this.createNewEmployee.qualifications.length === 0;
  }
  qualificationloading: boolean = false;
  qualificationtableActions: TableAction[] = [
    { name: ACTIONS.EDIT, label: 'Edit' },
    { name: ACTIONS.DELETE, label: 'Delete' },
  ];
  qualificationtableColumns = [
    { name: 'name', title: 'Name of Qualification', type: ColumnTypes.Text },
    { name: 'type', title: 'Type', type: ColumnTypes.Text},
    { name: 'courseName', title: 'Course', type: ColumnTypes.Text },
    { name: 'institution', title: 'Institution', type: ColumnTypes.Text },
    { name: 'startDate', title: 'Start Date', type: ColumnTypes.Date },
    { name: 'endDate', title: 'End Date', type: ColumnTypes.Date },
  ];

  tempDocumentList: Document[] = [];
  indVDocuments : Document;
  documenttotalItems = 0;
  documentcurrentPage = 1;
  get documentEmpty() {
    return this.createNewEmployee.documents.length === 0;
  }
  documentloading: boolean = false;
  documenttableActions: TableAction[] = [
    { name: ACTIONS.EDIT, label: 'Edit' },
    { name: ACTIONS.DELETE, label: 'Delete' },
  ];
  documenttableColumns = [
    { name: 'name', title: 'Document Name', type: ColumnTypes.Text },
    { name: 'docType', title: 'Document Type', type: ColumnTypes.Text},
    { name: 'lastModifiedDate', title: 'Last Modified Date', type: ColumnTypes.Date },
  ];


  tempEmpBanksList = [];
  indVEmpBanks = new EmployeeBankDTO().clone();
  EmpBanktotalItems = 0;
  EmpBankcurrentPage = 1;
  get EmpBankEmpty() {
    return this.createNewEmployee.banks.length === 0;
  }
  get disableaddBank() {
    let resp: boolean = true;
    
    let nullable = [
      'account_name', 'account_type', 'bank_name', 'companyID',
    'createdById',
'dateCreated',
'dateModified',
'employee_id',
'id',
'isActive',
'isDeleted',
'is_primary',
'modifiedById',
'subID',
  ]

    Object.entries(this.indVEmpBanks).map(([key, value], index) => {      
      if ((value == "" || value == null || value == undefined) && nullable.indexOf(key) == -1) {       
        resp = false;
      }
      if(key == 'account_no' && !this.accountNumberValidate)resp = false;
    });
    
    return resp;
  }
  EmpBankloading: boolean = false;
  EmpBanktableActions: TableAction[] = [
    { name: ACTIONS.EDIT, label: 'Edit' },
    { name: ACTIONS.DELETE, label: 'Delete' },
  ];
  EmpBanktableColumns = [
    { name: 'bank_name', title: 'Bank Name', type: ColumnTypes.Text },
    { name: 'account_no', title: 'Account No', type: ColumnTypes.Text},
    { name: 'account_name', title: 'Account Name', type: ColumnTypes.Text },
    { name: 'account_type', title: 'Account Type', type: ColumnTypes.Text },
    { name: 'is_primary', title: 'Primary', type: ColumnTypes.Text },
   
  ];
  accountNumberValidate: boolean = false;
  bankList: DropdownValue[] = [];
  accounttypes: IDTextViewModel[] = [];
  constructor(private newEmployee: CreateEmployeeServiceProxy, private myDropdown: DataServiceProxy,
    private alertservice: AlertserviceService, private FetchEmployeeByIdService: FetchEmployeeByIdServiceProxy,
    private activatedroute: ActivatedRoute, private router: Router) { }

  documenttableActionClicked(event: TableActionEvent) {
    if (event.name == "1") {
      this.indVDocuments = event.data;
      this.showdocumentUploadModal = true;
 
    }
    if (event.name == "2") {
      this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.CONFIRM, event.data.name, 'Yes').subscribe(data => {
        if (data == "closed") {
     //Delete Document Record
        }
  
      })
    }
  }
  
  qualificationtableActionClicked(event: TableActionEvent) {
    if (event.name == "1") {
      this.indvQualifications = event.data;
      this.showQualificationModal = true;
      
    }
    if (event.name == "2") {
      this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.CONFIRM, event.data.name, 'Yes').subscribe(data => {
        if (data == "closed") {
     //Delete Document Record
        }
  
      })
    }
     }
     embBanktableActionClicked(event: TableActionEvent) {
      if (event.name == "1") {
        this.indVEmpBanks = event.data;
        this.showbankModal = true;
        
      }
      if (event.name == "2") {
        this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.CONFIRM, event.data.name, 'Yes').subscribe(data => {
          if (data == "closed") {
       //Delete Document Record
          }
    
        })
      }
       }
  addtopbank(bank: EmployeeBankDTO) {
    console.log(bank)
    let searchResult = this.tempEmpBanksList.find(x => x.numb_account == bank.account_no);
    if (searchResult) {
      this.errorMsg = "Account Exist on the List";
      this.removeErrorMsg();
    } else {
      let newbnkObj = {
        id_bank: bank.bank_id,
        numb_account: bank.account_no,
        type_account: bank.account_typeId,
        code_sort: bank.bank_sort_code,
        pry_is:bank.is_primary
      }
      this.tempEmpBanksList.push(newbnkObj)
    }
   // console.log(this.tempEmpBanksList)
  }
  removefromBank(i) {
    this.tempEmpBanksList.splice(i, 1);
  }


  functionAutoMap(pObject, objectB) {
    const newObj = {...pObject, ...objectB };   
    return newObj;
}
  getbankname(bankid) {
    return this.bankList.find(x => x.option_value == bankid).option_text;
  }
  
 async getBankList() {
    let response = await this.myDropdown.getDropDownValuesById(3).toPromise();
    this.bankList = response.result;
  }

  async getBankAccountTypeList() {
    let response = await this.myDropdown.getAccountTypes().toPromise();
    this.accounttypes = response.result;
  }
  pushUpdateBank() {
    if (this.tempEmpBanksList.length > 0) {
      this.tempEmpBanksList.forEach(value => {
        let newBankObject = new EmployeeBankDTO().clone();
        newBankObject.bank_id = value.id_bank;
        newBankObject.account_no = value.numb_account;
        newBankObject.account_typeId = value.type_account;
        newBankObject.bank_sort_code = value.code_sort;
        newBankObject.is_primary = value.pry_is;
        newBankObject.employee_id = this.createNewEmployee.id;
        this.createNewEmployee.banks.push(newBankObject);
      });
     
    }
   
  }
  inputNumberValidation(event) {
    var inputentry =  event.target.value;

    var reg = new RegExp('^[-,-.0-9]+$');
    if (inputentry && reg.test(inputentry)) {
      if (inputentry.length != 10) {
        this.accountNumberValidate = false;
        this.errorMsg = "please input 10 digit account number";
        this.removeErrorMsg();
      } else {
        this.errorMsg = "";
        this.accountNumberValidate = true;
        return true;
      }
      
    } else {
      if(event.key == "Backspace" || event.key == "Delete" || event.key == "ArrowLeft" || event.key == "ArrowRight"){

      } else {
        this.errorMsg="please input number only";
        this.removeErrorMsg();        
        event.target.value = inputentry.slice(0,-1);
        return false;
      }
    
    
    }
  }

  removeErrorMsg() {
    setTimeout(() => {
      this.errorMsg = '';
    }, 3000);
  }
  topActionButtons = [
    { name: 'submit', label: 'Submit', 'icon': '', outline: false },
  ];
  modal(buttion) {
    if (buttion === 'submit') {
      this.createEmployee();
    }
  }
  getEmployeebyId(employeeId) {
    this.FetchEmployeeByIdService.getEmployeeById(employeeId).subscribe((data) => {
      if (!data.hasError) {
        this.createNewEmployee = data.result;
    }
    });
}
 async getProfileOperation() {
    let response = await this.myDropdown.employeeProfileOperation().toPromise();
    this.profileOperations = response.result;
  }
  selectPanel(hiringlist, i) {
    this.selectedPanel = hiringlist;

    this.hiringChecklist.forEach(value => {
      value.status = 'Inactive';
    })
    this.hiringChecklist[i].status = 'Active';
    this.selectedCase = this.hiringChecklist[i].title;
  }
  openSideBar() {
    this.showEmployeeContractModal = true;
  }


  async getDropDownValue(id, variable: DropdownValue[]){
    let response = await this.myDropdown.getDropDownValuesById(4).toPromise();
    variable = response.result;
  }

  getMaritalStatus(){
    this.myDropdown.getDropDownValuesById(4).subscribe(data => {
      if(!data.hasError){
        this.maritalStatusValues = data.result;
        console.log(this.maritalStatusValues)
      }
      else {
        console.log('There was an error')
      }
    })
  }
  getSelectedEmployee(event) {
    
  }
  getDocumentType() {
    this.myDropdown.getDocumentTypes().subscribe(typedata => {
      if(!typedata.hasError){
        this.alldocTypes = typedata.result;
      }
      else {
        console.log('There was an error getting file type')
      }
    })
  }
  getEmploymentStatus(){
    this.myDropdown.getDropDownValuesById(1).subscribe(data => {
      if(!data.hasError){
        this.employmentStatusValues = data.result;
        console.log(this.employmentStatusValues)
      }
      else {
        console.log('There was an error')
      }
    })
  }

  getReligion(){
    this.myDropdown.getDropDownValuesById(8).subscribe(data => {
      if(!data.hasError){
        this.religionValues = data.result;
      }
      else {
        console.log('There was an error')
      }
    })
  }


  getGender(){
    this.myDropdown.getDropDownValuesById(12).subscribe(data => {
      if(!data.hasError){
         this.genderValues = data.result;
      }
      else {
        console.log('There was an error')
      }
    })
  }

  nextPanel() {    
    var pos = this.hiringChecklist.findIndex(x => x.title == this.selectedPanel.title);
    var newPos = parseInt(String(pos)) + parseInt(String(1));
  
    if (newPos) {
      this.selectPanel(this.hiringChecklist[newPos], newPos);
    }    
  }
  submitbank() {    
    if (this.createNewEmployee.id) {
      this.reqEmployee.profileOperation = this.profileOperations.find(x => x.text == "Bank").id;
      this.createEmployee();      
    }
    this.showbankModal = false;
  }

  createEmployee() {
    this.loading = true;
    this.pushUpdateBank();
    this.reqEmployee = this.functionAutoMap(this.reqEmployee, this.createNewEmployee);  
    this.reqEmployee.banks = JSON.stringify(this.createNewEmployee.banks);
    this.reqEmployee.nexkOfKin = JSON.stringify(this.createNewEmployee.nexkOfKin);
    this.newEmployee.addEmployee(this.reqEmployee).subscribe(data => {
      if(data.hasError){
        this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.FAILED, data.message, "ok");
        this.getEmployeebyId(this.createNewEmployee.id);
      }
      else {
        this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.SUCCESS, data.message, "ok").subscribe(data => {
          if (this.createNewEmployee.id) {
            this.getEmployeebyId(this.createNewEmployee.id);
            this.selectPanel(this.hiringChecklist[0],0)
          } else {
            this.router.navigate(['/employeemodule/employeerecords'])
          }
        });
        
        this.tempEmpBanksList = [];
        console.log(data.message)
      }
      this.loading = false;
    }, (error) => {
      this.loading = false;
      if (error.status == 400) {
        this.alertservice.openCatchErrorModal(this.alertservice.ALERT_TYPES.FAILED, error.title, "Ok", error.errors);
      }
    })
  }
  removeFile(event: FlowDirective, mFile: Transfer) {
    this.files = this.files.filter(file => file.name !== mFile.name);
    event.cancelFile(mFile);
  }


  onDropFileceived(event: FlowDirective) {
    event.transfers$.subscribe(value => {
      this.files = value.transfers;
    });
  }
  filereceived(event: FlowDirective) {
    event.transfers$.subscribe(value => {
      this.files = value.transfers;
    });
  }
  onDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
  }
  
  ngOnInit(): void {
    this.createNewEmployee.documents = [];
    this.createNewEmployee.qualifications = [];
    this.createNewEmployee.banks = [];
    this.createNewEmployee.nexkOfKin = new NextOfKin().clone();
    this.getMaritalStatus();
    this.getEmploymentStatus();
    this.getGender();
    this.getReligion();
    this.getDocumentType();
    this.getBankList();
    this.getBankAccountTypeList();
    this.getProfileOperation();
    this.activatedroute.queryParams.subscribe(data => {
      if (data) {
        if (data.employee_id) {
          this.getEmployeebyId(data.employee_id);
        }
      }
    })
  }
}
