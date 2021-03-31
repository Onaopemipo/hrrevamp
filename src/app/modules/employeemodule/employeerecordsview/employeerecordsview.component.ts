import { EmployeeDTO, IEmployeeDTO, CreateEmployeeServiceProxy, DropdownValue, DropdownValueDTO,  DataServiceProxy } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { FlowDirective, Transfer } from '@flowjs/ngx-flow';
@Component({
  selector: 'ngx-employeerecordsview',
  templateUrl: './employeerecordsview.component.html',
  styleUrls: ['./employeerecordsview.component.scss']
})
export class EmployeerecordsviewComponent implements OnInit {
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
  files: Transfer[]=[];
  constructor(private newEmployee: CreateEmployeeServiceProxy, private myDropdown: DataServiceProxy ) { }
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
  ngOnInit(): void {
    this.getMaritalStatus();
    this.getEmploymentStatus();
    this.getGender();
    this.getReligion();
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

  createEmployee(){
    this.newEmployee.addEmployee(this.createNewEmployee).subscribe(data => {
      if(data.hasError){
        console.log('There was an error');
      }
      else {
        console.log(data.message)
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
}
