import { CommonServiceProxy } from 'app/_services/service-proxies';
import { TalentManagementServiceProxy, AddTalentMangementDTO, TalentManagementRequirmentsDTO, Competency } from './../../../_services/service-proxies';
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
  // poolModel: MyTalentPool = new MyTalentPool;
  allTalentPool: MyTalentPool [] = [];
  loading = false;
  viewPoolModal: boolean = false;
  poolModel: AddTalentMangementDTO =  new AddTalentMangementDTO;
  competencyRequirementModel: TalentManagementRequirmentsDTO [] = [];
  allCompetencies: Competency [] = [];

  talentPoolTable: TableColumn [] = [
    {name: 'name', title: 'Name'},
    {name: 'position', title: 'Position'},
    {name: 'experience', title: 'Experience'},
    {name: 'qualification', title: 'Qualification'},
    {name: 'certification', title: 'certification'},
    {name: 'skills', title: 'Skills'},
  ];
  constructor(private poolservice: TalentPoolService, private confirm: ConfirmBoxService,
    private alertMe: AlertserviceService, private newPoolService: TalentManagementServiceProxy,private commonService: CommonServiceProxy ) { }

  ngOnInit(): void {
    this.fetchPool();
  }

  addNewPool(){
  this.newPool = !this.newPool;
  }

  modalShow(){
    this.viewPoolModal = !this.viewPoolModal;
  }

  // async createTalentPool(){
  //   let poolRecord = this.poolModel;
  //   this.poolservice.create(this.poolModel).subscribe(data => {
  //     if(data.isSuccessful){
  //       this.alertMe.openModalAlert('Success', 'Successful', 'Dismiss')
  //       console.log('Congrats, pool created successfully')
  //     }
  //     else {
  //       console.log('Try again please')
  //     }
  //   })
  //   console.log('this is it:', poolRecord)
  // }

  async createTalentPool(){
    this.poolModel.talentManagementRequirmentsDTOs = this. competencyRequirementModel;
    const data = await this.newPoolService.createTalentManagementPool(this.poolModel).toPromise();
    if(!data.hasError){
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Successful', 'Dismiss')
      console.log('Congrats, pool created successfully')
    }
    else {
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED  , 'Successful', 'Dismiss')
      console.log('Try again please')
    }
  }

  async deleteTalentPool(){
    this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.CONFIRM, 'Do you want to delete talent pool', 'Dismiss').subscribe(data => {
      // if(data == 'yes')
    });
    const data = await this.newPoolService.deleteEmployeeFromTalentManagmentPool(1).toPromise();
  }

  async fetchPool(){
    const data = await this.poolservice.list({}).toPromise()
    console.log('Yes Boss, the data is here:',data.data)
    this.allTalentPool = data.data;
  }

  async getCompetency(){
    const data = await this.commonService.getCompetency().toPromise();
    if(!data.hasError){
      this.allCompetencies = data.result;
      console.log('All competencies', this.allCompetencies)
    }
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
