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
  allTalentPool: MyTalentPool [] = [];
  loading = false;
  viewPoolModal: boolean = false;
  addTalentPool: boolean = false;
  poolModel: AddTalentMangementDTO =  new AddTalentMangementDTO;
  btnProcessing: boolean = false;
  allCompetencies: CompetencyDTO [] = [];
  allTalentPools: AddTalentMangementDTO [] = [];
  competencyCounter: number = 0;
  poolData: AddTalentMangementDTO = new AddTalentMangementDTO().clone();

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
  this.newPool = !this.newPool;
  }

  modalShow(){
    this.viewPoolModal = true;
  }

  createTalentPool(){
    this.btnProcessing = true;
    this.newPoolService.createTalentManagementPool(this.poolModel).subscribe(data => {
    this.btnProcessing = false;
    if(!data.hasError){
      this.poolModel = new AddTalentMangementDTO().clone();
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Success!', 'OK').subscribe(dataAction => {
        if(dataAction){
          this.fetchAllPools();
          this.newPool = false;
        }
      })

    }
    else {
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED  , 'Failed', 'OK')
      console.log('Try again please')
    }
   });

  }

  updateTalentPool(){
    this.btnProcessing = true;
    this.newPoolService.createTalentManagementPool(this.poolData).subscribe(data => {
    this.btnProcessing = false;
    if(!data.hasError){
      this.poolData = new AddTalentMangementDTO().clone();
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Success!', 'OK').subscribe(dataAction => {
        if(dataAction){
          this.fetchAllPools();
          this.newPool = false;
        }
      })

    }
    else {
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED  , 'Failed', 'OK')
      console.log('Try again please')
    }
   });

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
    this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.CONFIRM, 'Do you want to delete talent pool', 'Yes').subscribe(res => {
      if(res){
        this.newPoolService.deleteTalentManagmentPool(poolId).subscribe(data => {
          if(!data.hasError){
            this.fetchAllPools();
            this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Pool Deleted Successfully', 'OK')
          }
        });
      }
    });

  }

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

  editPool(id){
    this.newPoolService.getTalentPoolById(id).subscribe(data => {
      if(!data.hasError){
        this.poolData = data.result;
        this.newPool = true;
      }
    })

  }

  // async deletePool(id){
  //   const approved = await this.confirm.confirm('Are you sure?').toPromise();
  //   if(!approved) {
  //     this.confirm.close();
  //     return false;
  //   }
  //   this.confirm.showLoading();
  //  const data = await this.poolservice.delete(id).toPromise();
  //  if(data.isSuccessful){
  //    console.log('Deleted:', data.message)
  //  }
  //  this.confirm.close();
  //  return true;
  // }

}
