import { CustomServiceService } from './../../../_services/custom-service.service';
import { DataServiceProxy, FileParameter, IDTextViewModel, MessageOut, BulkMasterServiceProxy } from 'app/_services/service-proxies';
import { FlowDirective, Transfer } from '@flowjs/ngx-flow';
import { TableActionEvent } from './../../../components/tablecomponent/models';
import { AlertserviceService } from './../../../_services/alertservice.service';
import { AddEmployyeetoPoolDTO, TalentManagementServiceProxy, AddTalentMangementDTO, IVwUserObj, EmployeeTalentManagementDTO } from './../../../_services/service-proxies';
import { MyTalentPoolEmployee, TalentPoolService, MyTalentPoolRequirement, MyTalentPool, TalentPoolRequirementTypes } from './../services/talent-pool.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TableColumn, TableAction } from 'app/components/tablecomponent/models';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthenticationService } from 'app/_services/authentication.service';
import { NbTabsetComponent } from '@nebular/theme';

enum TABLE_ACTION {
  VIEW = '1',
  DELETE = '2',
}
@Component({
  selector: 'ngx-testpool',
  templateUrl: './testpool.component.html',
  styleUrls: ['./testpool.component.scss']
})
export class TestpoolComponent implements OnInit, AfterViewInit {
  @ViewChild(NbTabsetComponent) tab: NbTabsetComponent;
  loading = true;
  testPoolTable: TableColumn [] = [
    {name: 'employeeId', title: 'Employee ID'},
    {name: 'employeeName', title: 'Employee Name'},
    {name: 'departmentName', title: 'Department Name'},
    {name: 'positionName', title: 'Position'},
  ];

  requirementTable : TableColumn [] = [
    {name: 'category', title: 'Category'},
    {name: 'type', title: 'Type'},
    {name: 'requirementPoint', title: 'Requirement Point'},
    {name: 'skillWeight', title: 'Skill Weight'},
    {name: 'experience', title: 'Experience'},
    {name: 'experienceWeight', title: 'Experience Weight'},
  ];


channel: { source: string, label: string, status: boolean }[] = [
  {source: 'database', label: 'Employee Database',  status: true},
  {source: 'portal', label: 'Recruitment Portal', status: false},
  {source: 'external', label: 'External Source',  status: false},
];

purposes: { value: string, label: string}[] = [
  {value: 'retirement', label: 'Retirement'},
  {value: 'firing', label: 'Firing'},
  {value: 'positionChange', label: 'Change of Position'},
  {value: 'exit', label: 'Exit'},
];

tableActionClicked(event: TableActionEvent){
  if(event.name==TABLE_ACTION.DELETE){
    this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.CONFIRM, 'Do you want to rempve employee?', 'Yes').subscribe(dataAction => {
      if(dataAction){
        this.talentPool.deleteEmployeeFromTalentManagmentPool(this.pageId, event.data.id).subscribe(data => {
          if (!data.hasError) {
            this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, data.message, 'Dismiss').subscribe(resp => {
              this.talentPool.getTalentPoolById(this.pageId).subscribe(data => {
                if(!data.hasError){
                  this.poolRecords = data.result.employeeTalentManagement;
                  this.pageTitle = data.result.title;
                  this.employeeCounter = data.result.employeeTalentManagement.length;
                  this.loading = false;
                }
              })
            })
          }
        })
      }
    })
    }
   else if(event.name==TABLE_ACTION.VIEW){
      this.route.navigateByUrl('/career-succession/profiledetails/'+ event.data.employeeId)
    }
}
tableActions: TableAction[] = [
{name: TABLE_ACTION.VIEW, label: 'View'},
{name: TABLE_ACTION.DELETE, label: 'Delete'},

]

selectedChannel: string = 'database';
poolRequirementModel: MyTalentPoolRequirement = new MyTalentPoolRequirement

showCandidateModal = false;
showRequirementModal = false;
poolTypes: any = [];

allowmultipleselection: boolean = false;
selectionHeader: string = "Select Employee";
addbtnText: string = "Add Employee";

talentPoolHeader: string = 'No Candidate yet';
talentPoolDescription: string = 'Click on the button to add candidate to the pool';
myButton: string = 'Add New';
poolEmployee: AddEmployyeetoPoolDTO = new AddEmployyeetoPoolDTO().clone();

 newCandidate: boolean = true;
 employeeCounter: number = 0;
 pageTitle: string = '';
 pageId:number = 0;
 user: IVwUserObj;

 allbulkProcesses: IDTextViewModel[] = [];
 initialUploadResp = new MessageOut().clone();
//  poolRecords: AddTalentMangementDTO = new AddTalentMangementDTO();
poolRecords: EmployeeTalentManagementDTO [] = []
 candidateModel: MyTalentPoolEmployee = new MyTalentPoolEmployee;
 rButton = [
  {name: 'candidate', label: 'Add Candidate', icon: 'plus', outline: true},
]
  constructor(private router: ActivatedRoute, private poolservice: TalentPoolService,  private CustomService: CustomServiceService,
    private alertMe: AlertserviceService,  private navCtrl: Location, private route: Router,
    private talentPool: TalentManagementServiceProxy, private DataService: DataServiceProxy,
    public authServ: AuthenticationService, private BulkMasterService: BulkMasterServiceProxy) { }
  ngAfterViewInit(): void {
    this.tab.selectTab(this.tab.tabs.first);
  }

  ngOnInit(): void {
    // window.globalThis.vvvv = this;
    // this.pageId = Number(this.router.snapshot.paramMap.get("id"));
    this.poolEmployee.talentPoolId = this.pageId;
    console.log(this.channel);
    this.fetchTypes();
    this.getProccessId();
    // this.fetchSinglePool();
    this.talentPool.getTalentPoolById(this.pageId = Number(this.router.snapshot.paramMap.get("id"))).subscribe(data => {
      if(!data.hasError){
        this.poolRecords = data.result.employeeTalentManagement;
        this.pageTitle = data.result.title;
        this.employeeCounter = data.result.employeeTalentManagement.length;
        this.loading = false;
      }
    })

  }

  removeFile(event: FlowDirective, mFile: Transfer) {
    this.files = this.files.filter(file => file.name !== mFile.name);
    event.cancelFile(mFile);
  }

  files: Transfer[]=[];
  onDropFileceived(event: FlowDirective) {
    event.transfers$.subscribe(value => {
      this.files = value.transfers;

    });
  }
  filereceived(event: FlowDirective) {
    event.transfers$.subscribe(value => {
      this.files = value.transfers;
      this.files[0].flowFile.file


    });
  }
  onDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
  }
  getProccessId() {
    this.DataService.getBulkUploadProcesses().subscribe(data => {
      if (!data.hasError) {
        this.allbulkProcesses = data.result;
        console.log('all process IDs', this.allbulkProcesses)
      }
    })
  }

  downloadSampleFile() {
    let processId = this.allbulkProcesses.find(x => x.text == 'Employee Records Upload').id;
    this.CustomService.downloadSampleTemplate(processId).subscribe((data) => {
      const dtype = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      this.CustomService.downloadFile(data, dtype);

    })
  }
  uploadBulkEmployee() {
    this.loading = true;
    let processId = this.allbulkProcesses.find(x => x.text == 'Employee Records Upload').id;
    let FileParameter: FileParameter= {data:'',fileName:''};
    FileParameter.data = this.files[0].flowFile.file;
    FileParameter.fileName = this.files[0].flowFile.name;
    this.BulkMasterService.bulkUpload(processId, FileParameter).subscribe(data => {
      this.loading = false;
      if (!data.hasError) {
        this.initialUploadResp = data.result;

      }
    })
  }

  async fetchTypes(){
   this.poolTypes = await this.poolservice.getRequirementTypes().toPromise();
   console.log('Hey Boss',this.poolTypes)
  }


  async getLoggedInUser(){
    this.authServ.getuser().then(async (users: IVwUserObj[])=> {
      if (users) {
        if (users.length > 0) {
          this.user = users[0];
  }
  }
  })

  }
  onTopActionClick(){
      this.showCandidateModal = true;
      console.log('Yes clicked')
  }

  goback() {
    this.navCtrl.back();
  }

  addCandidate(){
    // this.newCandidate = !this.newCandidate;
    this.showCandidateModal = true;
  }

  cancel(){
    this.showCandidateModal = false;
  }

  async addCandidateToPool(){
    this.poolEmployee.talentPoolId = this.pageId;
    const data = await this.talentPool.addUpdateEmployeetoTalentManagementPool(this.poolEmployee).toPromise();
    if(!data.hasError){
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Candidate Added', 'Dismiss').subscribe(dataAction => {
        this.route.navigateByUrl('career-succession/talentpool/'+ this.pageId);
      })
    }

    else {
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, data.message, 'Dismiss').subscribe(dataAction => {
        this.route.navigateByUrl('career-succession/talentpool'+ this.pageId);
      })
    }
  }

  // async fetchSinglePool(){
  //   const data = await this.talentPool.getTalentPoolById(this.pageId).toPromise();
  //   console.log('Here is the data',data.result)
  //   if(!data.hasError && data.result.employeeTalentManagement.length > 0){
  //     this.poolRecords = data.result.employeeTalentManagement;
  //     this.pageTitle = data.result.title;
  //     console.log('Page Title:',this.pageTitle)
  //     this.employeeCounter = data.result.employeeTalentManagement.length;
  //     console.log('Single Record', this.poolRecords);
  //     this.loading = false;
  //   }
  // }

onChangeChannel($value){
  console.log($value)
  // this.channel.forEach(element => {
  //   if(element.source == $value) {
      // element.status = true;
      // this.channel.status = true;
      this.selectedChannel = $value;
    // }
    // else
    // console.log('This is my value', this.channel)
    // return this.channel;

  // });
}

getSelectedEmployee(event,selectType) {
  console.log(event)
   if(selectType == 'employee'){
    this.poolEmployee.employeeId = event[0].employeeNumber;
    // this.poolEmployee.name = event[0].firstName + '' + event[0].lastName;
   }
   console.log(selectType, event)
}

}
