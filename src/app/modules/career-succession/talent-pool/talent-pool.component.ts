import { Router } from '@angular/router';
import { CommonServiceProxy} from 'app/_services/service-proxies';
import { TalentManagementServiceProxy, AddTalentMangementDTO, CompetencyDTO, CompetencyServiceProxy } from './../../../_services/service-proxies';
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
  allPoolCounter: number = 0;
  poolRequirementModel: MyTalentPoolRequirement = new MyTalentPoolRequirement
  // poolModel: MyTalentPool = new MyTalentPool;
  allTalentPool: MyTalentPool [] = [];
  loading = false;
  viewPoolModal: boolean = false;
  poolModel: AddTalentMangementDTO =  new AddTalentMangementDTO;
  //competencyRequirementModel: TalentManagementRequirmentsDTO [] = [];
  allCompetencies: CompetencyDTO [] = [];
  allTalentPools: AddTalentMangementDTO [] = [];
  competencyCounter: number = 0;

  talentPoolTable: TableColumn [] = [
    {name: 'name', title: 'Name'},
    {name: 'position', title: 'Position'},
    {name: 'experience', title: 'Experience'},
    {name: 'qualification', title: 'Qualification'},
    {name: 'certification', title: 'certification'},
    {name: 'skills', title: 'Skills'},
  ];
  constructor(private poolservice: TalentPoolService, private confirm: ConfirmBoxService, private router: Router,
    private alertMe: AlertserviceService, private newPoolService: TalentManagementServiceProxy,
    private commonService: CommonServiceProxy, private competencyService: CompetencyServiceProxy) { }

  ngOnInit(): void {
    this.getCompetency();
    this.fetchAllPools();
  }

  addNewPool(){
  this.newPool = true;
  }

  modalShow(){
    this.viewPoolModal = true;
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
  //  this.poolModel.talentManagementRequirmentsDTOs = this.competencyRequirementModel;
    const data = await this.newPoolService.createTalentManagementPool(this.poolModel).toPromise();
    if(!data.hasError){
      this.poolModel = new AddTalentMangementDTO().clone();
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Talent Pool created!', 'Dismiss').subscribe(dataAction => {
        if(dataAction == 'closed'){
          this.router.navigateByUrl('/career-succession/talentpool');
        }
      })
      console.log('Congrats, pool created successfully');

    }
    else {
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED  , 'Failed', 'Dismiss')
      console.log('Try again please')
    }
  }

  fetchAllPools(){
    this.loading = true;
    this.newPoolService.fetchTalentManagementPool().subscribe(data => {
    this.loading = false;
    if(!data.hasError){
      this.allTalentPools = data.result;
      this.allPoolCounter = data.totalRecord;
      console.log('See my pools', this.allTalentPools)
      console.log('See my pools', this.allPoolCounter)
    }
  })
  }

  async deleteTalentPool(poolId){
    this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.CONFIRM, 'Do you want to delete talent pool', 'Yes').subscribe(data => {
      if(data == 'closed'){
        this.newPoolService.deleteTalentManagmentPool(poolId).subscribe(dataAction => {
          if(!dataAction.hasError){
            this.fetchAllPools();
            this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Pool Deleted Successfully', 'Dismiss')
          }
        });
      }
    });

  }

  // async fetchSinglePool(){    const data = await this.newPoolService.getTalentPoolById().toPromise()
  //   console.log('Yes Boss, the data is here:',data.data)
  //   this.allTalentPool = data.data;
  // }

  // async getCompetency(){
  //   const data = await this.commonService.getCompetency().toPromise();
  //   if(!data.hasError){
  //     this.allCompetencies = data.result;
  //     console.log('All competencies', this.allCompetencies)
  //   }
  // }

  async getCompetency(){
    const data = await this.competencyService.fetchCompetency('',0,10,1).toPromise();
    if(!data.hasError){
      this.allCompetencies = data.result;
      this.competencyCounter = data.totalRecord;
      console.log('All competencies', this.allCompetencies)
    }
   }

  addRequirement(){
    let poolRequirement = this.poolRequirementModel;
    console.log('Hey Boss',poolRequirement)
    this.poolRequirementModel = new MyTalentPoolRequirement
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
