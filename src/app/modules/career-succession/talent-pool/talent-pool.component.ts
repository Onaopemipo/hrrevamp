import { AlertserviceService } from 'app/_services/alertservice.service';
import { ConfirmBoxService } from 'app/_services/confirm-box.service';
import { MyTalentPool, MyTalentPoolRequirement, TalentPoolService } from '../services/talent-pool.service';
// import { TalentPoolModel } from './../../../_models/careers.model';
import { TableColumn } from './../../../components/tablecomponent/models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-talent-pool',
  templateUrl: './talent-pool.component.html',
  styleUrls: ['./talent-pool.component.scss']
})
export class TalentPoolComponent implements OnInit {
  rButton = [
    {name: 'a', label: 'Add New', icon: 'plus'},
  ]
  talentPoolHeader: string = 'Create a Talent Pool';
  talentPoolDescription: string = 'Click on the button to create your first pool';
  myButton: string = 'Create Talent Pool';
  newPool:boolean = false;
  talentPool: string = '';
  poolRequirementModel: MyTalentPoolRequirement = new MyTalentPoolRequirement
  poolModel: MyTalentPool = new MyTalentPool;
  allTalentPool: MyTalentPool [] = [];
  loading = false;
  viewPoolModal: boolean = false;

  talentPoolTable: TableColumn [] = [
    {name: 'name', title: 'Name'},
    {name: 'position', title: 'Position'},
    {name: 'experience', title: 'Experience'},
    {name: 'qualification', title: 'Qualification'},
    {name: 'certification', title: 'certification'},
    {name: 'skills', title: 'Skills'},
  ];
  constructor(private poolservice: TalentPoolService, private confirm: ConfirmBoxService, private alertMe: AlertserviceService) { }

  ngOnInit(): void {
    this.fetchPool();
  }

  addNewPool(){
  this.newPool = !this.newPool;
  }

  modalShow(){
    this.viewPoolModal = !this.viewPoolModal;
  }

  async createTalentPool(){
    let poolRecord = this.poolModel;
    this.poolservice.create(this.poolModel).subscribe(data => {
      if(data.isSuccessful){
        this.alertMe.openModalAlert('Success', 'Successful', 'Dismiss')
        console.log('Congrats, pool created successfully')
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
  }

  editPool(){

  }

  async deletePool(id){
    const approved = await this.confirm.confirm('Are you sure?').toPromise();
    if(!approved) {
      this.confirm.close();
      return false;
    }
    this.confirm.showLoading();
   const data = await this.poolservice.delete(id).toPromise();
   if(data.isSuccessful){
     console.log('Deleted:', data.message)
   }
   this.confirm.close();
   return true;
  }

}
