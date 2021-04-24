import { MyTalentPoolEmployee, TalentPoolService, MyTalentPoolRequirement, MyTalentPool, TalentPoolRequirementTypes } from './../services/talent-pool.service';
import { ActivatedRoute } from '@angular/router';
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

selectedChannel: string = 'database';
poolRequirementModel: MyTalentPoolRequirement = new MyTalentPoolRequirement

showCandidateModal = false;
showRequirementModal = false;
poolTypes: any = [];

 newCandidate: boolean = true;
 pageTitle:string = '';
 pageId:number = 0;
 poolRecords: MyTalentPool = new MyTalentPool;
 candidateModel: MyTalentPoolEmployee = new MyTalentPoolEmployee;
 rButton = [
  {name: 'candidate', label: 'Add Candidate', icon: 'plus', outline: true},
]
  constructor(private router: ActivatedRoute, private poolservice: TalentPoolService,  private navCtrl: Location) { }

  ngOnInit(): void {
    console.log(this.channel);
    this.fetchPool();
    this.fetchTypes();
    this.pageId = Number(this.router.snapshot.paramMap.get("id"))
    console.log(this.poolRecords.requirements)
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

  async addRequirement(){
    let poolRequirement = this.poolRequirementModel;
    console.log('Hey Boss',poolRequirement)
    const data = await this.poolservice.addRequirementToPool(this.poolRecords, this.poolRequirementModel).toPromise()
    if(data.isSuccessful){
      console.log('Success')
      this.poolRequirementModel = new MyTalentPoolRequirement;
    }
    else {
      console.log(data.message)
    }
  }


  addCandidate(){
    this.newCandidate = !this.newCandidate;
  }

  async addCandidateToPool(){
   const data = await this.poolservice.addToPool(1,this.candidateModel).toPromise()
   if(data.isSuccessful){
    console.log('Hey Boss', data.message)
   }
  }

  async fetchPool(){
    this.loading = true;
    const data = await this.poolservice.fetch(this.pageId).toPromise();
    // console.log('Yes Boss, the data is here:',data)
    this.poolRecords = data;
    this,this.pageTitle = data.title;
    console.log('Hey', this.poolRecords)
    this.loading = false;
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

}
