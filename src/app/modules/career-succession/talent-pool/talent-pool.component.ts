import { MyTalentPool } from './../services/talent-pool.service';
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
  // poolModel: TalentPoolModel[] = []
  poolModel: MyTalentPool = new MyTalentPool;
  allPool: string = '';

  talentPoolTable: TableColumn [] = [
    {name: 'name', title: 'Name'},
    {name: 'position', title: 'Position'},
    {name: 'experience', title: 'Experience'},
    {name: 'qualification', title: 'Qualification'},
    {name: 'certification', title: 'certification'},
    {name: 'skills', title: 'Skills'},
  ];
  constructor() { }

  ngOnInit(): void {
  }

  addNewPool(){
  this.newPool = !this.newPool;
  }


  createTalentPool(){
    let poolRecord = this.poolModel;
    console.log('this is it:', poolRecord)
  }

}
