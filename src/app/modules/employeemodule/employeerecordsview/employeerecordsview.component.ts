import {
  EmployeeDTO, CreateEmployeeServiceProxy,RecruitmentSettingServiceProxy,
  FetchEmployeeByIdServiceProxy,Location,SalaryScale,Grade,
  DropdownValue, EmployeeBankDTO, DataServiceProxy, ManageEmployeeDTO, IDTextViewModel,
  EmployeeQualificationDTO, Document, NextOfKin, AddressDTO, Country, State, LGA, Pension,
  EmployeeHistoryDTO, CommonServiceProxy, Position, EmployeeSkill, EmployeeCertificationDTO,
  Skill, GetAllProfessionalBodiesServiceProxy, ProfessionalBodyDTO, Certification, EmployeeContractAssignmentDTO,
  JobRole, PayrollType, GradeStep, FileStorageManagerServiceProxy, FileParameter, UploadProfileImageServiceProxy,
  EmployeeSkillDTO, Qualification, Course, Institution,
} from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { FlowDirective, Transfer } from '@flowjs/ngx-flow';
import { ColumnTypes, TableAction, TableActionEvent, ACTIONS } from 'app/components/tablecomponent/models';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'app/_services/authentication.service';

@Component({
  selector: 'ngx-employeerecordsview',
  templateUrl: './employeerecordsview.component.html',
  styleUrls: ['./employeerecordsview.component.scss']
})

export class EmployeerecordsviewComponent implements OnInit {
  rsaError: any = "";
  pensionForm: FormGroup;
  nxtKinForm: FormGroup;
  contactForm: FormGroup;
  loading: boolean = false;
  title: string = "Employee Profile"
  selectedCase: string = 'profile_panel';
  selectedPanel: any = { title: 'profile_panel', label: 'Profile', status: 'Active' };
  hiringChecklist = [
    { title: 'profile_panel', label: 'Profile', status: 'Active' },
    { title: 'contract_panel', label: 'Contract', status: 'Inactive' },
    { title: 'document_panel', label: 'Document Upload', status: 'Inactive' },    
    { title: 'bank_panel', label: 'Bank Profile', status: 'Inactive' },
    { title: 'kin_panel', label: 'Next of Kin', status: 'Inactive' },
    { title: 'contact_panel', label: 'Contact', status: 'Inactive' },
    { title: 'pension_panel', label: 'Pension', status: 'Inactive' },
    { title: 'History_panel', label: 'History', status: 'Inactive' },
    { title: 'skills_panel', label: 'Skills', status: 'Inactive' },   
    { title: 'certification_panel', label: 'Certifications', status: 'Inactive' },
    { title:'qualification_Info', label: 'Qualification', status: 'Inactive' },
    { title: 'training_panel', label: 'Training', status: 'Inactive' },
    // { title: 'custom_panel', label: 'Employee Custom Form', status: 'Inactive'},
  ];

  newEmployeeForm: NgForm;
  createNewEmployee: EmployeeDTO = new EmployeeDTO().clone();

  allInstitution: Institution[] = [];
  allCourses: Course[] = [];
  allQulificationType: IDTextViewModel[] = [];
  allQualifications: Qualification[] = [];
  allGradeSteps: GradeStep[] = [];
  allgrades: Grade[] = [];
  allSalaryScale: SalaryScale[] = [];
  allemploymenttypes: IDTextViewModel[] = [];
  allpayrolltypes: IDTextViewModel[] = [];
  alllocations: Location[] = [];
  alljobRoles: JobRole[] = [];
  allCertfications: Certification[] = [];
  allProfessionalBodes: ProfessionalBodyDTO[] = []
  allskills: Skill[] = [];
  allPositions: Position[] = [];
  alllgaByStates: LGA[] = [];
  allStates: State[] = [];
  allCountries: Country[] = [];
  pfaList: DropdownValue[] = [];
  maritalStatusValues: DropdownValue[] = [];
  allfiletypes: IDTextViewModel[] = [];
  genderValues: DropdownValue[] = [];
  religionValues: DropdownValue[] = [];
  employmentStatusValues: DropdownValue[] = [];
  alladdressType: DropdownValue[] = [];
  alldepartments: DropdownValue[] = [];

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
  profilefiles: Transfer[] = [];
  errorMsg: string = "";
  alldocTypes: IDTextViewModel[] = [];
  reqEmployee = new ManageEmployeeDTO().clone();
  newNextofKin = new NextOfKin().clone();
  profileOperations = [];

  tempQualificationList = [];
  indvQualifications = new EmployeeQualificationDTO().clone();
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
    { name: 'type', title: 'Type', type: ColumnTypes.Text },
    { name: 'courseName', title: 'Course', type: ColumnTypes.Text },
    { name: 'institution', title: 'Institution', type: ColumnTypes.Text },
    { name: 'startDate', title: 'Start Date', type: ColumnTypes.Date },
    { name: 'endDate', title: 'End Date', type: ColumnTypes.Date },
  ];
  get disableaddQualification() {
    let resp: boolean = true;
    let nullable = [
      'id',
      'companyID',
      'subID',
      'employeeId',
      'name',
      'qualificationGradeId',
      'institution',
      'courseName',
      'type',
      'grade',
      'isActive',
      'isDeleted',
      'dateCreated',
      'createdById',
      'dateModified',
      'modifiedById',
    ]

    // courseId!: number;
    // institutionId!: number;

    // startDate!: Date;
    // endDate!: Date;
    // typeId!: number;

    Object.entries(this.indvQualifications).map(([key, value], index) => {      
      if ((value == "" || value == null || value == undefined) && nullable.indexOf(key) == -1) {       
        resp = false;
      }
 
    });
   
    return resp;
  }

  tempDocumentList: Document[] = [];
  indVDocuments = new Document().clone();
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
    { name: 'docType', title: 'Document Type', type: ColumnTypes.Text },
    { name: 'lastModifiedDate', title: 'Last Modified Date', type: ColumnTypes.Date },
  ];
  get disableDocumentbtn() {
    let resp: boolean = true;
    let nullable = [
      'employee_Id',
      'employeeNo',
      'directory',
      'lastModifiedDate',
      'comment',
      'id',
      'companyID',
      'subID',
      'isActive',
      'isDeleted',
      'dateCreated',
      'createdById',
      'dateModified',
      'modifiedById',
    ]
    
    Object.entries(this.indVDocuments).map(([key, value], index) => {      
      if ((value == "" || value == null || value == undefined) && nullable.indexOf(key) == -1) {       
        resp = false;
      }
 
    });
    return resp;
  }


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
      'bank_sort_code'
    ]

    Object.entries(this.indVEmpBanks).map(([key, value], index) => {
      if ((value == "" || value == null || value == undefined) && nullable.indexOf(key) == -1) {
        resp = false;
      }
      if (key == 'account_no' && !this.accountNumberValidate) resp = false;
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
    { name: 'account_no', title: 'Account No', type: ColumnTypes.Text },
    { name: 'account_name', title: 'Account Name', type: ColumnTypes.Text },
    { name: 'account_type', title: 'Account Type', type: ColumnTypes.Text },
    { name: 'is_primary', title: 'Primary', type: ColumnTypes.Text },

  ];
  accountNumberValidate: boolean = false;
  bankList: DropdownValue[] = [];
  accounttypes: IDTextViewModel[] = [];


  indvEmpContact = new AddressDTO().clone();
  tempEmpContactList = [];
  EmpContactloading: boolean = false;
  EmpContactcurrentPage = 1;
  EmpContacttotalItems = 0;
  EmpContacttableColumns = [
    { name: 'address_type', title: 'Address Type', type: ColumnTypes.Text },
    { name: 'country', title: 'Country', type: ColumnTypes.Text},
    { name: 'state', title: 'State', type: ColumnTypes.Text },
    { name: 'lga', title: 'LGA', type: ColumnTypes.Text },
    { name: 'address1', title: 'Address 1', type: ColumnTypes.Text },
    { name: 'address2', title: 'Address 2', type: ColumnTypes.Text },
    { name: 'is_primary', title: 'Primary', type: ColumnTypes.Text },
   
  ];
  EmpContacttableActions: TableAction[] = [
    { name: ACTIONS.EDIT, label: 'Edit' },
    { name: ACTIONS.DELETE, label: 'Delete' },
  ];


  indvEmpHistory = new EmployeeHistoryDTO().clone();
  tempEmpHistoryList = [];
  EmpHistoryloading: boolean = false;
  EmpHistorycurrentPage = 1;
  EmpHistorytotalItems = 0;
  EmpHistorytableColumns = [
    { name: 'jobTitle', title: 'Job Title', type: ColumnTypes.Text },
    { name: 'department', title: 'Department', type: ColumnTypes.Text},
    { name: 'designation', title: 'Designation', type: ColumnTypes.Text },
    { name: 'employerAddress', title: 'Employer Address', type: ColumnTypes.Text },
    { name: 'startDate', title: 'Start Date', type: ColumnTypes.Date },
    { name: 'endDate', title: 'End Date', type: ColumnTypes.Date },

   
  ];
  get EmpHistoryEmpty() {
    return this.createNewEmployee.employmentHistories.length === 0;
  }
  get disableaddHistory() {
    let resp: boolean = true;
        
    let nullable = [
      'id',
      'companyID',
      'subID',
      'employeeID',    
      'jobTitle',
      'department',
      'isActive',
      'isDeleted',
      'dateCreated',
      'createdById',
      'dateModified',
      'modifiedById'
  ]
    Object.entries(this.indvEmpHistory).map(([key, value], index) => {      
      if ((value == "" || value == null || value == undefined) && nullable.indexOf(key) == -1) {       
        resp = false;
      }
  
    });
    return resp;
  }
  EmpHistorytableActions: TableAction[] = [
    { name: ACTIONS.EDIT, label: 'Edit' },
    { name: ACTIONS.DELETE, label: 'Delete' },
  ];


  indvEmpSkill = new EmployeeSkill().clone();
  tempEmpSkillList = [];
  EmpSkillloading: boolean = false;
  EmpSkillcurrentPage = 1;
  EmpSkilltotalItems = 0;
  EmpSkilltableColumns = [

    { name: 'skillName', title: 'Skill Name', type: ColumnTypes.Text },
    { name: 'startDate', title: 'start Date', type: ColumnTypes.Date },
    { name: 'numberOfExperienceInMonth', title: 'Experience In Month', type: ColumnTypes.Text },
      
  ];
  getSkillExperince() {
    let today = new Date();
    this.indvEmpSkill.numberOfExperienceInMonth = Math.floor(this.dateDiffInDays(this.indvEmpSkill.startDate, today) / 30);
    return this.indvEmpSkill.numberOfExperienceInMonth;
  }
  get EmpSkillEmpty() {
    return this.createNewEmployee.skills.length === 0;
  }
  get disableaddSkill() {
    let resp: boolean = true;
        
    let nullable = [
      'employeeId',
      'skillName',
      'point',
      'employee',
      'skill',
      'id',
      'companyID',
      'subID',
      'isActive',
      'dateCreated',
      'createdById',
      'dateModified',
      'modifiedById',
      'isDeleted'
    ]
    Object.entries(this.indvEmpSkill).map(([key, value], index) => {      
      if ((value == "" || value == null || value == undefined) && nullable.indexOf(key) == -1) {       
        resp = false;
      }
  
    });
   // console.log(this.indvEmpSkill);
    return resp;
  }
  EmpSkilltableActions: TableAction[] = [
    { name: ACTIONS.EDIT, label: 'Edit' },
    { name: ACTIONS.DELETE, label: 'Delete' },
  ];


  indvEmpCert = new EmployeeCertificationDTO().clone();
  tempEmpCertList = [];
  EmpCertloading: boolean = false;
  EmpCertcurrentPage = 1;
  EmpCerttotalItems = 0;
  EmpCerttableColumns = [
    { name: 'certification', title: 'Name of Certification', type: ColumnTypes.Text },
    { name: 'institution', title: 'Vendor', type: ColumnTypes.Text },
    { name: 'startDate', title: 'Start Date', type: ColumnTypes.Date },
    { name: 'endDate', title: 'End Date', type: ColumnTypes.Date },
      
  ];
  get EmpCertEmpty() {
    return this.createNewEmployee.certifications.length === 0;
  }
  get disableaddCert() {
    let resp: boolean = true;
        
    let nullable = [
      'id',
      'companyID',
      'subID',
      'employeeId',
      'certification',
      'comment',
      'numberOfExperienceInMonth',
      'isActive',
      'isDeleted',
      'dateCreated',
      'createdById',
      'dateModified',
      'modifiedById',
      'institution'
    ]
  

    Object.entries(this.indvEmpCert).map(([key, value], index) => {      
      if ((value == "" || value == null || value == undefined) && nullable.indexOf(key) == -1) {       
        resp = false;
      }
  
    });
    //console.log(this.indvEmpCert)
    return resp;
  }
  EmpCerttableActions: TableAction[] = [
    { name: ACTIONS.EDIT, label: 'Edit' },
    { name: ACTIONS.DELETE, label: 'Delete' },
  ];



  indvemployeeContract = new EmployeeContractAssignmentDTO().clone();
  tempEmpContractList = [];
  EmpContractloading: boolean = false;
  EmpContractcurrentPage = 1;
  EmpContracttotalItems = 0;
  EmpContracttableColumns = [
    { name: 'assignmentNumber', title: 'Assignment No', type: ColumnTypes.Text },
    { name: 'departmentName', title: 'Depertment', type: ColumnTypes.Text },
    { name: 'jobName', title: 'Job Title', type: ColumnTypes.Text },
    { name: 'positionName', title: 'Position', type: ColumnTypes.Text },
    { name: 'locationName', title: 'Location', type: ColumnTypes.Text },
    { name: 'dateOfConfirmation', title: 'Confirmation Date', type: ColumnTypes.Date },
    { name: 'dateOfAppointment', title: 'Appointment Date', type: ColumnTypes.Date },
      
  ];
  get EmpContractEmpty() {
    return this.createNewEmployee.contracts.length === 0;
  }
  get disableaddContract() {
    let resp: boolean = true;
        
    let nullable = [
      'id',
      'companyID',
      'subID',
      'supNumber',
      'firstName',
      'lastName',
      'otherName',
      'supervisorName',
      'departmentName',
      'jobName',
      'gradeName',
      'stepNo',
      'locationName',
      'locationCode',
      'positionName',
      'ministryId',
      'ministryName',
      'salaryScaleName',
      'dateofPresentAppointment',
      'dateofPresentAppointmentStr',
      'dateOfAppointmentStr',
      'dateOfLastDeployment',
      'dateOfLastDeploymentStr',
      'dateOfConversionStr',
      'dateOfConfirmationStr',
      'dateDeployed',
      'dateDeployedStr',
      'contractEndDateStr',
      'datePromotion',
      'datePromotionStr',
      'dateOfRetirement',
      'dateOfRetirementStr',
      'totalEarnings',
      'totalDeductions',
      'netPayment',
      'isContractActive',
      'isDefaultContract',
      'noOfLeaveDays',
      'peopleGroupId',
      'lastPromotionDate',
      'url',
      'cadreId',
      'directorate_id',
      'lcda_id',
      'lga_id',
      'gradeStepId',
      'payRollTypeId'
  ]
    Object.entries(this.indvemployeeContract).map(([key, value], index) => {      
      if ((value == "" || value == null || value == undefined) && nullable.indexOf(key) == -1) {       
        resp = false;
      }
  
    });
    return resp;
  }
  EmpContracttableActions: TableAction[] = [
    { name: ACTIONS.EDIT, label: 'Edit' },
    { name: ACTIONS.DELETE, label: 'Delete' },
  ];
  constructor(private newEmployee: CreateEmployeeServiceProxy, private myDropdown: DataServiceProxy,
    private alertservice: AlertserviceService, private FetchEmployeeByIdService: FetchEmployeeByIdServiceProxy,
    private activatedroute: ActivatedRoute, private router: Router, private CommonService: CommonServiceProxy,
    private GetAllProfessionalBodiesService: GetAllProfessionalBodiesServiceProxy,
    private RecruitmentSettingService: RecruitmentSettingServiceProxy,
    private UploadProfileImageService: UploadProfileImageServiceProxy,
    private FileUploadService: FileStorageManagerServiceProxy,
    public authServ: AuthenticationService ) { }
  
    dateDiffInDays(a: Date, b:Date):number {
      const _MS_PER_DAY = 1000 * 60 * 60 * 24;
   // Discard the time and time-zone information.
   const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
   const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  
   return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }
  empContracttableActionClicked(event: TableActionEvent) {
    if (event.name == "1") {
      this.indvemployeeContract = event.data;
      this.showEmployeeContractModal = true;      
    }
    if (event.name == "2") {
      this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.CONFIRM, event.data.positionName, 'Yes').subscribe(data => {
        if (data == "closed") {
     //Delete Document Record
        }
  
      })
    }
}
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
     
 
  empSkilltableActionClicked(event: TableActionEvent) {
    if (event.name == "1") {
      this.indvEmpSkill = event.data;
      this.showSkillModal = true;
      
    }
    if (event.name == "2") {
      this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.CONFIRM, event.data.skillName, 'Yes').subscribe(data => {
        if (data == "closed") {
     //Delete Document Record
        }
  
      })
    }
  }
  
  empCerttableActionClicked(event: TableActionEvent) {
    if (event.name == "1") {
      this.indvEmpCert = event.data;
      this.showCertificationModal = true;
      
    }
    if (event.name == "2") {
      this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.CONFIRM, event.data.certification, 'Yes').subscribe(data => {
        if (data == "closed") {
     //Delete Document Record
        }
  
      })
    }
}
  embHistorytableActionClicked(event: TableActionEvent) {
    if (event.name == "1") {
      this.indvEmpHistory = event.data;
      this.showEmpHistoryModal = true;
      
    }
    if (event.name == "2") {
      this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.CONFIRM, event.data.name, 'Yes').subscribe(data => {
        if (data == "closed") {
     //Delete Document Record
        }
  
      })
    }
  }
  empContacttableActionClicked(event: TableActionEvent) {
    if (event.name == "1") {
      this.indVEmpBanks = event.data;
      this.showbankModal = true;
      
    }
    if (event.name == "2") {
      this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.CONFIRM, event.data.address_type, 'Yes').subscribe(data => {
        if (data == "closed") {
     //Delete Document Record
        }
  
      })
    }
  }
  addtoEmpContract(contr: EmployeeContractAssignmentDTO) {
    let searchResult = this.tempEmpContactList.find(x => x.id_cert == contr.positionId);
    if (searchResult) {
      this.errorMsg = "Contract Exist on the List";
      this.removeErrorMsg();
    }else {
      let newCertObj = {
        f_name: contr.fullName,
        e_deprtmnt: contr.departmentId
      }
      this.tempEmpContactList.push(newCertObj)
    }
  }
  removefromEmpContract(i) {
    this.tempEmpContactList.splice(i, 1);
  }
  addtoCert(cert: EmployeeCertificationDTO) {
    let searchResult = this.tempEmpCertList.find(x => x.id_cert == cert.certificationId);
    if (searchResult) {
      this.errorMsg = "Certification Exist on the List";
      this.removeErrorMsg();
    }else {
      let newCertObj = {
        id_cert: cert.certificationId,
        cert_body: cert.professionalBodyId,
        cert_startDate: cert.startDate,
        cert_endDate: cert.endDate,
        cert_comment: cert.comment
      }
      this.tempEmpCertList.push(newCertObj)
      console.log(this.tempEmpCertList,newCertObj)
      this.indvEmpCert = new EmployeeCertificationDTO().clone();
    }
  }
  removefromCert(i) {
    this.tempEmpCertList.splice(i, 1);
  }
  addtoSkills(sk: EmployeeSkill) {
    let searchResult = this.tempEmpSkillList.find(x => x.id_skill == sk.skillId);
    if (searchResult) {
      this.errorMsg = "Skill Exist on the List";
      this.removeErrorMsg();
    }else {
      let newSkillObj = {
        id_skill: sk.skillId,
        no_exp: sk.numberOfExperienceInMonth,
        sk_startdate: sk.startDate
      }
      this.tempEmpSkillList.push(newSkillObj);
      this.indvEmpSkill = new EmployeeSkill().clone();
    }
  }
  removefromSkill(i) {
    this.tempEmpSkillList.splice(i, 1);
  }
  addtoContact(cont: AddressDTO) {
    let searchResult = this.tempEmpContactList.find(x => x.add_type == cont.address_type);
    if (searchResult) {
      this.errorMsg = "Address Type Exist on the List";
      this.removeErrorMsg();
    }else {
      let newContObj = {
        add_type: cont.address_type,
        cntry: cont.country_id,
        stte: cont.state_id,
        lgas: cont.lga_id,
        add1: cont.address1,
        add2: cont.address2,
        is_pry: cont.is_primary_address
      }
      this.tempEmpContactList.push(newContObj)
    }
  }
  removefromContact(i) {
    this.tempEmpContactList.splice(i, 1);
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
        pry_is: bank.is_primary
      }
      this.tempEmpBanksList.push(newbnkObj);
      this.indVEmpBanks = new EmployeeBankDTO().clone();
    }
    // console.log(this.tempEmpBanksList)
  }
  removefromBank(i) {
    this.tempEmpBanksList.splice(i, 1);
  }
  addtoQualification(indvQualifications: EmployeeQualificationDTO) {
    let searchResult = this.tempQualificationList.find(x => x.qual_id == indvQualifications.qualificationId);
    if (searchResult) {
      this.errorMsg = "Account Exist on the List";
      this.removeErrorMsg();
    } else {
      let newQualObj = {
        qual_id:  indvQualifications.qualificationId,
        qualtype_id: indvQualifications.typeId,
        qual_course_id: indvQualifications.courseId,
        qual_institution_id: indvQualifications.institutionId,
        start_date: indvQualifications.startDate,
        end_date:indvQualifications.endDate
      }
      this.tempQualificationList.push(newQualObj)
    }
  }
  removefromQualification(i) {
    this.tempQualificationList.splice(i, 1);
  }
  addtoEmpHistory(Hist: EmployeeHistoryDTO) {
    let searchResult = this.tempEmpHistoryList.find(x => x.numb_account == Hist.jobTitleId);
    if (searchResult) {
      this.errorMsg = "Account Exist on the List";
      this.removeErrorMsg();
    } else {
      let newHistObj = {
        title_job: Hist.jobTitleId,
        h_dpt: Hist.departmentId,
        h_designation: Hist.designation,
        h_empAdress: Hist.employerAddress,
        h_starthdate: Hist.startDate,
        h_endhdate:Hist.endDate
      }
      this.tempEmpHistoryList.push(newHistObj)
    }
  }
  removefromEmpHistory(i) {
    this.tempEmpHistoryList.splice(i, 1);
  }

  functionAutoMap(pObject, objectB) {
    const newObj = { ...pObject, ...objectB };
    return newObj;
  }
  getInstitutionName(Inst_id) {
    return this.allInstitution.find(x => x.id == Inst_id).name;
  }
  getQualificationName(qual_id) {
    return this.allQualifications.find(x => x.id == qual_id).name;
  }
  getbankname(bankid) {
    return this.bankList.find(x => x.option_value == bankid).option_text;
  }


  getEmpJobTitle(position_id) {
    return this.allPositions.find(x => x.id == position_id).title;
  }
  getEmpSkillName(skill_id) {
    return this.allskills.find(x => x.id == skill_id).name;
  }
  getEmpCertName(cert_id) {
    if(this.allCertfications.length > 0) return this.allCertfications.find(x => x.id == cert_id).name;
    return "";
  }
  getAddresstypename(typeid) {
    return this.alladdressType.find(x => x.option_value == typeid).option_text;
  }
 async getBankList() {
    let response = await this.myDropdown.getDropDownValuesById(3).toPromise();
    this.bankList = response.result;
  }

  async getBankAccountTypeList() {
    let response = await this.myDropdown.getAccountTypes().toPromise();
    this.accounttypes = response.result;
  }
  pushUpdateConatct() {
    if (this.tempEmpContactList.length > 0) {
      this.tempEmpContactList.forEach(value => {
        let newContactObj = new AddressDTO().clone();
        newContactObj.address_type = value.add_type;
        newContactObj.country_id = value.cntry;
        newContactObj.state_id = value.stte;
        newContactObj.lga_id = value.lgas;
        newContactObj.address1 = value.add1;
        newContactObj.address2 = value.add2;
        newContactObj.is_primary_address = value.is_pry;
        newContactObj.employee_id = this.createNewEmployee.id;
          this.createNewEmployee.addresses.push(newContactObj);
      });
  
    }
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
  pushUpdateQualification() {
    if (this.tempQualificationList.length > 0) {
      this.tempQualificationList.forEach(value => {
        let newQualObject = new EmployeeQualificationDTO().clone();
        newQualObject.qualificationId = value.qual_id;
        newQualObject.typeId = value.qualtype_id;
        newQualObject.courseId = value.qual_course_id;
        newQualObject.institutionId = value.qual_institution_id;
        newQualObject.startDate = value.start_date;
        newQualObject.endDate = value.end_date;
        newQualObject.employeeId = this.createNewEmployee.id;
        this.createNewEmployee.qualifications.push(newQualObject);
       })
    }
}
  pushUpdateHistory() {
    if (this.tempEmpHistoryList.length > 0) {
      this.tempEmpHistoryList.forEach(value => {
        let newHistoryObject = new EmployeeHistoryDTO().clone();
        newHistoryObject.jobTitleId = value.title_job;
        newHistoryObject.departmentId = value.h_dpt;
        newHistoryObject.designation = value.h_designation;
        newHistoryObject.employerAddress = value.h_empAdress;
        newHistoryObject.startDate = value.h_starthdate;
        newHistoryObject.endDate = value.h_endhdate;
        newHistoryObject.employeeID = this.createNewEmployee.id;
        this.createNewEmployee.employmentHistories.push(newHistoryObject);
      });

    }
   
  }
  pushUpdateSkill() {
    if (this.tempEmpSkillList.length > 0) {
      this.tempEmpSkillList.forEach(value => {
        let newSkillObject = new EmployeeSkillDTO().clone();
        newSkillObject.skillId = value.id_skill;
        newSkillObject.numberOfExperienceInMonth = value.no_exp;
        newSkillObject.startDate = value.sk_startdate;
        newSkillObject.employeeId = this.createNewEmployee.id;

        this.createNewEmployee.skills.push(newSkillObject);
      });
    }
  }
  pushUpdateCerti() {
    if (this.tempEmpCertList.length > 0) {
      this.tempEmpCertList.forEach(value => {
        let newCertObject = new EmployeeCertificationDTO().clone();
        newCertObject.certificationId = value.id_cert;
        newCertObject.institution = value.cert_inst;
        newCertObject.startDate = value.sk_startdate;
        newCertObject.endDate = value.cert_endDate;
        newCertObject.comment = value.cert_comment;
        newCertObject.employeeId = this.createNewEmployee.id;
        this.createNewEmployee.certifications.push(newCertObject);
      });
    }

  }
  inputNumberValidation(event) {
    var inputentry = event.target.value;

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
      if (event.key == "Backspace" || event.key == "Delete" || event.key == "ArrowLeft" || event.key == "ArrowRight") {

      } else {
        this.errorMsg = "please input number only";
        this.removeErrorMsg();
        event.target.value = inputentry.slice(0, -1);
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
    this.loading = true
    this.FetchEmployeeByIdService.getEmployeeById(employeeId).subscribe((data) => {
      this.loading = false;
      if (!data.hasError) {
        this.createNewEmployee = data.result;
        console.log(this.createNewEmployee)
        this.createNewEmployee.nexkOfKin = this.createNewEmployee.nexkOfKin? this.createNewEmployee.nexkOfKin : new NextOfKin().clone();
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


  async getDropDownValue(id, variable: DropdownValue[]) {
    let response = await this.myDropdown.getDropDownValuesById(4).toPromise();
    variable = response.result;
  }

  getMaritalStatus() {
    this.myDropdown.getDropDownValuesById(4).subscribe(data => {
      if (!data.hasError) {
        this.maritalStatusValues = data.result;
        console.log(this.maritalStatusValues)
      }
      else {
        console.log('There was an error')
      }
    })
  }
  getSelectedEmployee(event) {

    console.log(event);
    this.indvemployeeContract.supervisorId = event[0].id
  }
  getDocumentType() {
    this.myDropdown.getDocumentTypes().subscribe(typedata => {
      if (!typedata.hasError) {
        this.alldocTypes = typedata.result;
      }
      else {
        console.log('There was an error getting file type')
      }
    })
  }
  getEmploymentStatus() {
    this.myDropdown.getDropDownValuesById(1).subscribe(data => {
      if (!data.hasError) {
        this.employmentStatusValues = data.result;
        console.log(this.employmentStatusValues)
      }
      else {
        console.log('There was an error')
      }
    })
  }

  getReligion() {
    this.myDropdown.getDropDownValuesById(8).subscribe(data => {
      if (!data.hasError) {
        this.religionValues = data.result;
      }
      else {
        console.log('There was an error')
      }
    })
  }


  getGender() {
    this.myDropdown.getDropDownValuesById(12).subscribe(data => {
      if (!data.hasError) {
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
    this.nextPanel();
  }
  submitContact() {
    if (this.createNewEmployee.id) {
      this.reqEmployee.profileOperation = this.profileOperations.find(x => x.text == "Address").id;
      this.createEmployee();      
    }
    this.nextPanel();
  }
  submitPension() {
    if (this.createNewEmployee.id) {
      this.reqEmployee.profileOperation = this.profileOperations.find(x => x.text == "Pension").id;
      this.createEmployee();      
    }
    this.nextPanel();
  }

  submitNextOfKin() {
    if (this.createNewEmployee.id) {
      this.reqEmployee.profileOperation = this.profileOperations.find(x => x.text == "NexkOfKin").id;
      this.createNewEmployee.nexkOfKin.employee_id = this.createNewEmployee.id
      this.createEmployee();      
    }
    this.nextPanel();
  }
  submitEmpHistory() {
    if (this.createNewEmployee.id) {
      this.reqEmployee.profileOperation = this.profileOperations.find(x => x.text == "EmploymentHistory").id;
      this.createEmployee();      
    }
    this.showEmpHistoryModal = false;
    this.nextPanel();
  }
  submitEmpSkills() {
    if (this.createNewEmployee.id) {
      this.reqEmployee.profileOperation = this.profileOperations.find(x => x.text == "Skill").id;
      this.createEmployee();      
    }
    this.showSkillModal = false;
    this.nextPanel();
  }
  submitEmpCert() {
    if (this.createNewEmployee.id) {
      this.reqEmployee.profileOperation = this.profileOperations.find(x => x.text == "Certification").id;
      this.createEmployee();      
    }
    this.showCertificationModal = false;
    this.nextPanel();
  }
  submitContract(employeeContract:EmployeeContractAssignmentDTO) {
    if (this.createNewEmployee.id) {
      this.reqEmployee.profileOperation = this.profileOperations.find(x => x.text == "Contract").id;
     let contPos = this.createNewEmployee.contracts.findIndex(x => x.assignmentNumber == employeeContract.assignmentNumber);
      this.createNewEmployee.contracts[contPos] = employeeContract;
      this.createEmployee();      
    }
  }
  submitDocument(indVDocuments:Document) {
    if (this.createNewEmployee.id) {
      let file = this.files[0].flowFile.file;     
      let filep ={
        id: 0,
        employee_id: this.createNewEmployee.id,
        employeeNo: this.createNewEmployee.employeeNumber,
        name: this.createNewEmployee.fullName,
        directory: "",
        lastModifiedDate: new Date(),
        docUrl:  "",
        file: {
          data: file,
          fileName: file.name
        },
        docType: indVDocuments.docType,
        comment: indVDocuments.comment
      };
     
     
      this.FileUploadService.uploadDocuments(filep.id, filep.employee_id, filep.employeeNo, filep.name, filep.directory, filep.lastModifiedDate,
        filep.docUrl, filep.file, filep.docType, filep.comment).subscribe((data) => {
          if (!data.hasError) {
            this.getEmployeebyId(this.createNewEmployee.id);
            this.showdocumentUploadModal = false;
            this.nextPanel();
          } else {
            this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.FAILED, data.message, "ok");
          }

        });
      // this.reqEmployee.profileOperation = this.profileOperations.find(x => x.text == "Document").id;
      // indVDocuments.employee_Id = this.createNewEmployee.id;
      // this.createNewEmployee.documents.push(indVDocuments)
      // this.createEmployee();      
    }
    this.showCertificationModal = false;
    
  }
  submitQualification() {
    if (this.createNewEmployee.id) {
      this.reqEmployee.profileOperation = this.profileOperations.find(x => x.text == "Qualification").id;
      this.createEmployee();      
    }
    this.showQualificationModal = false;
    this.nextPanel();
  }
  createEmployee() {
    this.loading = true;
    this.pushUpdateBank();
    this.reqEmployee = this.functionAutoMap(this.reqEmployee, this.createNewEmployee);
    this.pushUpdateConatct();
    this.pushUpdateHistory();
    this.pushUpdateSkill();
    this.pushUpdateCerti();
    this.pushUpdateQualification();
    this.reqEmployee = this.functionAutoMap(this.reqEmployee, this.createNewEmployee);  
    this.reqEmployee.banks =this.createNewEmployee.banks.length > 0? JSON.stringify(this.createNewEmployee.banks):"";
    this.reqEmployee.nexkOfKin = JSON.stringify(this.createNewEmployee.nexkOfKin);
    this.reqEmployee.pension = JSON.stringify(this.createNewEmployee.pension);
    this.reqEmployee.addresses = this.createNewEmployee.addresses.length > 0? JSON.stringify(this.createNewEmployee.addresses):"";
    this.reqEmployee.employmentHistories =this.createNewEmployee.employmentHistories.length > 0? JSON.stringify(this.createNewEmployee.employmentHistories):"";
    this.reqEmployee.skills =this.createNewEmployee.skills.length > 0? JSON.stringify(this.createNewEmployee.skills):"";
    this.reqEmployee.certifications =this.createNewEmployee.certifications.length > 0? JSON.stringify(this.createNewEmployee.certifications):"";
    this.reqEmployee.contracts =this.createNewEmployee.contracts.length > 0? JSON.stringify(this.createNewEmployee.contracts):"";
    this.reqEmployee.documents = this.createNewEmployee.documents.length > 0?JSON.stringify(this.createNewEmployee.documents):"";
    this.reqEmployee.qualifications = this.createNewEmployee.qualifications.length > 0?JSON.stringify(this.createNewEmployee.qualifications):"";


    this.newEmployee.addEmployee(this.reqEmployee).subscribe(data => {
      if (data.hasError) {
        this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.FAILED, data.message, "ok");
        if(this.createNewEmployee.id)this.getEmployeebyId(this.createNewEmployee.id);
        
      }
      else {
        this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.SUCCESS, data.message, "ok").subscribe(data => {
          if (this.createNewEmployee.id) {
            this.getEmployeebyId(this.createNewEmployee.id);
            this.selectPanel(this.hiringChecklist[0], 0)
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
      if(this.createNewEmployee.id)this.getEmployeebyId(this.createNewEmployee.id);
      if (error.status == 400) {
        this.alertservice.openCatchErrorModal(this.alertservice.ALERT_TYPES.FAILED, error.title, "Ok", error.errors);
      }
    })
  }
  profileremoveFile(event: FlowDirective, mFile: Transfer) {
    this.profilefiles = this.files.filter(file => file.name !== mFile.name);
    event.cancelFile(mFile);
  }
  removeFile(event: FlowDirective, mFile: Transfer) {
    this.files = this.files.filter(file => file.name !== mFile.name);
    event.cancelFile(mFile);
  }

  profileonDropFileceived(event: FlowDirective) {
    event.transfers$.subscribe(value => {
      this.profilefiles = value.transfers;
    });
  }
  onDropFileceived(event: FlowDirective) {
    event.transfers$.subscribe(value => {
      this.files = value.transfers;
    });
  }
  getBase64(rfile) {
    return new Promise((resolved, rejected) => {
      let file = rfile;
      let reader = new FileReader();
     reader.readAsDataURL(file);
     let b64 = "";
     reader.onload = function () {
       b64 = reader.result.toString().split(",")[1];
       resolved(b64);
     };
 
      reader.onerror = function (error) {
        console.log('Error: ', error);
     };

    });

 }
  profilefilereceived(event: FlowDirective) {
    event.transfers$.subscribe(value => {
      this.profilefiles = value.transfers;
      let file = this.profilefiles[0].flowFile.file;

      if (this.createNewEmployee.id) {
      
        this.getBase64(file).then((data: string) => {
      
          this.UploadProfileImageService.uploadProfileImage(data, this.createNewEmployee.id).subscribe(data => {
            if (!data.hasError) {
              this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.SUCCESS, data.message, "ok");
              this.getEmployeebyId(this.createNewEmployee.id);
            }
          })
        });
  
  
      }
     
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

  profileonDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
  }
  getaddressType() {
    this.myDropdown.getDropDownValuesById(16).subscribe(data => {
      if(!data.hasError){
         this.alladdressType = data.result;
      }
      else {
        console.log('There was an error')
      }
    })
  }
  getCountry() {
    this.myDropdown.getCountries().subscribe(data => {
      if(!data.hasError){
         this.allCountries = data.result;
      }
      else {
        console.log('There was an error')
      }
    })
  }
  getStatebyCountryId(country_id) {
    this.myDropdown.getStates().subscribe(data => {
      if(!data.hasError){
         this.allStates = data.result;
      }
      else {
        console.log('There was an error')
      }
    })
  }
  getlgaByStateId(state_id) {
    this.myDropdown.getLGAsByState(state_id).subscribe(data => {
      if(!data.hasError){
         this.alllgaByStates = data.result;
      }
      else {
        console.log('There was an error')
      }
    })
  }
  getPfa() {
    this.myDropdown.getDropDownValuesById(14).subscribe(data => {
      if(!data.hasError){
         this.pfaList = data.result;
      }
      else {
        console.log('There was an error')
      }
    })
  }
  getSkills() {
    this.CommonService.getSkills().subscribe(data => {
      if(!data.hasError){
        this.allskills = data.result;
      }
     else {
       console.log('There was an error')
     }
    })
  }
  getJobTitle() {
    this.CommonService.getPositions().subscribe(data => {
      if (!data.hasError) {
        this.allPositions = data.result;
      }else{}
      
    })
  }
  getJobRole() {
    this.CommonService.getJobRoles().subscribe(data => {
      if (!data.hasError) {
        this.alljobRoles = data.result;
      }else{}
      
    })
  }
  getdepartments() {
    this.myDropdown.getDropDownValuesById(2).subscribe(data => {
      if(!data.hasError){
         this.alldepartments = data.result;
      }
      else {
        console.log('There was an error')
      }
    })
  }
  getProfessionalBody() {
 
    this.GetAllProfessionalBodiesService.getAllProfessionalBodies(100, 1, undefined).subscribe(data => {
      if (!data.hasError) {
        this.allProfessionalBodes = data.result
     }
     else {
      console.log('There was an error')
    }
    })
  }
  getallcertifications() {
    this.CommonService.getCertifications().subscribe(data => {
      if (!data.hasError) {
        this.allCertfications = data.result;
      }else{}
      
    })
  }
  getalllocations() {
    this.CommonService.getLocations().subscribe(data => {
      if (!data.hasError) {
        this.alllocations = data.result;
      }else{}
      
    })
  }
  getallpayrolltypes() {
    this.CommonService.getPayrollTypes().subscribe(data => {
      if (!data.hasError) {
        this.allpayrolltypes = data.result;
      }else{}
      
    })
  } 
  getallEmploymenttypes() {
    this.RecruitmentSettingService.getEmploymentTypes().subscribe(data => {
      if (!data.hasError) {
        this.allemploymenttypes = data.result;
      }else{}
      
    })
  }
  getallSalaryScales() {
    this.CommonService.getSalaryScale().subscribe(data => {
      if (!data.hasError) {
        this.allSalaryScale = data.result;
      }else{}
      
    })
  }
  getallGrade() {
    this.CommonService.getGrades().subscribe(data => {
      if (!data.hasError) {
        this.allgrades = data.result;
      }else{}
      
    })
  }
  getallGradeSteps() {
    this.CommonService.getGradeSteps().subscribe(data => {
      if (!data.hasError) {
        this.allGradeSteps = data.result;
      }else{}
      
    })
  }
async  getAllfilestypes() {
    let response = await this.myDropdown.getDocumentTypes().toPromise();
    this.allfiletypes = response.result;
  }
  async  getAllQualifications() {
    this.CommonService.getQualifications().subscribe(data => {
      if (!data.hasError) {
        this.allQualifications = data.result;
      }else{}
      
    })
  }
  async  getAllQualificationsType() {
    this.myDropdown.qualificationCategories().subscribe(data => {
      if(!data.hasError){
         this.allQulificationType = data.result;
      }
      else {
        console.log('There was an error')
      }
    })
  }
  async  getAllQualificationsCourses() {
    this.CommonService.getCourses().subscribe(data => {
      if (!data.hasError) {
        this.allCourses = data.result;
      }else{}
      
    })
  }
  async  getAllInstitutions() {
    this.CommonService.getInstitutions().subscribe(data => {
      if (!data.hasError) {
        this.allInstitution = data.result;
      }else{}
      
    })
  }
  ngOnInit(): void {
    this.activatedroute.queryParams.subscribe(data => {
      if (data) {
        if (data.employee_id) {
          this.getEmployeebyId(data.employee_id);
        }        
      }
    })
    this.activatedroute.params.subscribe(data => {
      if (data) {
        if (data.type && data.type == "myprofile") {
          this.authServ.getuser().then((users) => {
            if (users) {            
              if (users[0]) {
                this.getEmployeebyId(users[0].employee_id);
              } else {        
                this.authServ.clearusers();
                this.router.navigate(['auth'])
             }
            } else {
              this.authServ.clearusers();
              this.router.navigate(['auth'])
            }
      
           })
        
        }
      }
      
      console.log(data)
    })
    this.createNewEmployee.documents = [];
    this.createNewEmployee.qualifications = [];
    this.createNewEmployee.banks = [];
    this.createNewEmployee.addresses = [];
    this.createNewEmployee.nexkOfKin = new NextOfKin().clone();
    this.createNewEmployee.pension = new Pension().clone();
    this.createNewEmployee.employmentHistories = [];
    this.createNewEmployee.skills = [];
    this.createNewEmployee.certifications = [];
    this.createNewEmployee.contracts = [];
    this.getProfessionalBody()
    this.getallcertifications()
    this.getSkills()
    this.getCountry();
    this.getaddressType();
    this.getMaritalStatus();
    this.getEmploymentStatus();
    this.getGender();
    this.getReligion();
    this.getDocumentType();
    this.getBankList();
    this.getBankAccountTypeList();
    this.getProfileOperation();
    this.getPfa();
    this.getJobTitle();
    this.getdepartments()
    this.getJobRole();
    this.getalllocations();
    this.getAllfilestypes();
    this.getAllQualifications();
    this.getAllQualificationsType();
    this.getAllQualificationsCourses();
    this.getAllInstitutions();
    this.getallpayrolltypes();
    this.getallEmploymenttypes();
    this.getallGrade();
    this.getallGradeSteps();
    this.getallSalaryScales();

  }

  goback() {
    this.router.navigate(['/employeemodule/employeerecords'])
  }
  get cRSAnumber() {
    if (this.createNewEmployee.pension.rsaNumber.length == 15) {
      this.rsaError = "";
      return true
    } else {
      this.rsaError = "RSA Number Must be 15 digits ";
      return false
  }  
  }
}
