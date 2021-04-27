import { AlertserviceService } from './../../../_services/alertservice.service';
import { AddEmployyeetoPoolDTO, TalentManagementServiceProxy, AddTalentMangementDTO } from './../../../_services/service-proxies';
import { MyTalentPoolEmployee, TalentPoolService, MyTalentPoolRequirement, MyTalentPool, TalentPoolRequirementTypes } from './../services/talent-pool.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TableColumn } from 'app/components/tablecomponent/models';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-testpool',
  templateUrl: './testpool.component.html',
  styleUrls: ['./testpool.component.scss']
})
export class TestpoolComponent implements OnInit {
  loading = true;
  testPoolTable: TableColumn [] = [
    {name: 'name', title: 'Name'},
    {name: 'department', title: 'Department'},
    {name: 'unit', title: 'Unit/Division'},
    {name: 'position', title: 'Position'},
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
 pageTitle:string = '';
 pageId:number = 0;
 poolRecords: AddTalentMangementDTO = new AddTalentMangementDTO;
 candidateModel: MyTalentPoolEmployee = new MyTalentPoolEmployee;
 rButton = [
  {name: 'candidate', label: 'Add Candidate', icon: 'plus', outline: true},
]
  constructor(private router: ActivatedRoute, private poolservice: TalentPoolService,
    private alertMe: AlertserviceService,  private navCtrl: Location, private route: Router,
    private talentPool: TalentManagementServiceProxy) { }

  ngOnInit(): void {
    this.pageId = Number(this.router.snapshot.paramMap.get("id"));
    console.log(this.channel);
    this.fetchTypes();
    console.log('This page',this.pageId);
    this.fetchSinglePool();

  }


  async fetchTypes(){
   this.poolTypes = await this.poolservice.getRequirementTypes().toPromise();
   console.log('Hey Boss',this.poolTypes)
  }

  onTopActionClick(event){
    console.log('yasss',event)
    if(event == 'requirement'){
        this.showRequirementModal = true;
    }
    else if(event == 'candidate'){
      this.showCandidateModal = true;
    }
  }

  goback() {
    this.navCtrl.back();
  }

  showId(){
    alert(this.pageId);
  }

  // async addRequirement(){
  //   let poolRequirement = this.poolRequirementModel;
  //   console.log('Hey Boss',poolRequirement)
  //   const data = await this.poolservice.addRequirementToPool(this.poolRecords, this.poolRequirementModel).toPromise()
  //   if(data.isSuccessful){
  //     console.log('Success')
  //     this.poolRequirementModel = new MyTalentPoolRequirement;
  //   }
  //   else {
  //     console.log(data.message)
  //   }
  // }


  addCandidate(){
    this.newCandidate = !this.newCandidate;
  }

  async addCandidateToPool(){
  //  const data = await this.poolservice.addToPool(1,this.candidateModel).toPromise();
    const data = await this.talentPool.addUpdateEmployeetoTalentManagementPool(this.poolEmployee).toPromise();
    if(!data.hasError){
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Candidate Added', 'Dismiss').subscribe(dataAction => {
        this.route.navigateByUrl('talentpool/'+ this.pageId);
      })
    }
  }

  async fetchSinglePool(){
    alert('I am here');
    const data = await this.talentPool.getTalentPoolById(this.pageId).toPromise();
    console.log('Here is the data',data)
    if(!data.hasError){
      this.poolRecords = data.result;
      this.pageTitle = this.poolRecords.title;
      console.log('Single Record', this.poolRecords)
      this.loading = false;
      alert('I am through')
    }
  }

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
   if(selectType == 'employee')this.poolEmployee.employeeId = event[0].employeeNumber;
  //  if (selectType == 'relief') this.leaveReq.reliefOfficerStaffNo = event[0].employeeNumber;

   console.log(selectType, event)
}

}
