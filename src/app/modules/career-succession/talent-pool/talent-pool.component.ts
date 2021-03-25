import { MyTalentPool, MyTalentPoolRequirement, TalentPoolService } from './../services/talent-pool.service';
import { TalentPoolModel } from './../../../_models/careers.model';
import { TableColumn } from './../../../components/tablecomponent/models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-talent-pool',
  templateUrl: './talent-pool.component.html',
  styleUrls: ['./talent-pool.component.scss']
})
export class TalentPoolComponent implements OnInit {

  talentPoolHeader: string = 'Create a Talent Pool';
  talentPoolDescription: string = 'Click on the button to create your first pool';
  myButton: string = 'Create Talent Pool';
  newPool:boolean = false;
  talentPool: string = '';
  poolRequirementModel: MyTalentPoolRequirement = new MyTalentPoolRequirement
  poolModel: MyTalentPool = new MyTalentPool;
  allTalentPool: MyTalentPool [] = [];
  allPool: string = 'dsd';


  talentPoolTable: TableColumn [] = [
    {name: 'name', title: 'Name'},
    {name: 'position', title: 'Position'},
    {name: 'experience', title: 'Experience'},
    {name: 'qualification', title: 'Qualification'},
    {name: 'certification', title: 'certification'},
    {name: 'skills', title: 'Skills'},
  ];
  constructor(private poolservice: TalentPoolService) { }

  ngOnInit(): void {
    this.fetchPool();
  }

  addNewPool(){
  this.newPool = !this.newPool;
  }

  // createPool(){
  //   this.poolservice.create()
  // }

  createTalentPool(){
    let poolRecord = this.poolModel;
    this.poolservice.create(this.poolModel).subscribe(data => {
      if(data.isSuccessful){
        console.log('Congrats')
      }
      else {
        console.log('Try again please')
      }
    })
    console.log('this is it:', poolRecord)
  }

  async fetchPool(){
    const data = await this.poolservice.list({}).toPromise()
    console.log('Yes Boss, the data is here:',data.data)
    this.allTalentPool = data.data;
  }

  addRequirement(){
    let poolRequirement = this.poolRequirementModel;
    console.log('Hey Boss',poolRequirement)
    this.poolRequirementModel = new MyTalentPoolRequirement
    // this.poolRequirementModel = [];
  }

  editPool(){

  }

  async deletePool(id){
   const data = await this.poolservice.delete(id).toPromise();
   if(data.isSuccessful){
     console.log('Deleted:', data.message)
   }
  }

}
