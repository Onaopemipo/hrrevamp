import { Certification, CommonServiceProxy, Competency } from 'app/_services/service-proxies';
import { map } from 'rxjs/operators';
import { FetchEmployeeByIdServiceProxy, EmployeeDTO, EmployeeContractAssignmentDTO, FetchAllEmployeesServiceProxy, GetCareerSuccesionPlanByIdServiceProxy, CareerSuccessionDTO } from './../../../_services/service-proxies';
import { TableColumn } from './../../../components/tablecomponent/models';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmployeesService, MyEmployeeDatail, } from '../services/employees.service';
import { throwIfAlreadyLoaded } from 'app/@core/module-import-guard';


class MyEmployeeDTO extends EmployeeDTO{

  get position_name(){
    return this.contracts[0].positionName;
  }

  get departmentName(){
    return this.contracts[0].departmentName;
  }

  get jobName(){
    return this.contracts[0].jobName;
  }

  get locationName(){
    return this.contracts[0].locationName;
  }
  get gradeName(){
    return this.contracts[0].gradeName;
  }

  // get myCertifications(){
  //   return this.certifications
  // }

  // get mySkills(){
  //   return this.skills[0];
  // }

  // myCertification

  // get myQualifications(){
  //   return this.qualifications[0] ;
  // }


}
@Component({
  selector: 'ngx-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {

  data: MyEmployeeDatail = new MyEmployeeDatail({});
  successionTable: TableColumn[] = [
    { name: 'name', title: 'Name' },
    { name: 'position', title: 'Position' },
    { name: 'experience', title: 'Experience' },
    { name: 'qualification', title: 'Qualification' },
    { name: 'certification', title: 'certification' },
  ];

  employeeData: MyEmployeeDTO = new MyEmployeeDTO;
  employeeContractData: EmployeeContractAssignmentDTO = new EmployeeContractAssignmentDTO
  planId: number = 0;
  employeeId:number = 0;
  planStatus: boolean = false;
  competencyId: number = 0;
  allCompetencies: Competency [] = [];
  roleCompetency: Competency = new Competency;
  planDetails: CareerSuccessionDTO = new CareerSuccessionDTO;
  pageLoading:boolean = true;

  constructor(private navCtrl: Location,
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeesService, private employee: FetchEmployeeByIdServiceProxy,
    private allEmployees: FetchAllEmployeesServiceProxy,
    private successionService: GetCareerSuccesionPlanByIdServiceProxy,
    private commonService: CommonServiceProxy) { }

  async ngOnInit() {
    this.employeeData.certifications = [];
    this.employeeData.skills = [];
    this.employeeData.qualifications = [];
    let subscription: Subscription = null;
    subscription = this.activatedRoute.paramMap.subscribe(params => {
      this.planId = parseInt(params.get('id'));

      // subscription.unsubscribe();
      // this.employeeService.fetch(this.employeeId).toPromise().then(response => {
      //   this.data = response;
      // })
    });
    this.fetchAllEmployees();
    // this.fetchProfile();
    this.fetchSinglePlan();
    // this.fetchCompetencies();
  }

  goback() {
    this.navCtrl.back();
  }

fetchProfile(){
    this.employee.getEmployeeById(this.employeeId).subscribe(data => {
      if(!data.hasError){
        this.employeeData = new MyEmployeeDTO(data.result);
        console.log('My Details', this.employeeData);
        console.log('My Contract', this.employeeContractData);
        this.pageLoading = false;
      }
    })
  }

  async fetchAllEmployees(){
    const data = await this.allEmployees.getAllEmployees('',1,10,1).toPromise();
    if(!data.hasError){
      console.log(data.result);
    }
  }

  addPlan() {
    // this.data.location_name
    this.data.skills[0].point
  }

  async fetchSinglePlan(){
    const data = await this.successionService.getCareerSuccessionPlanById(this.planId).toPromise();
    if(!data.hasError){
      this.planDetails = data.result;
      this.competencyId = data.result.competencyId;
      this.employeeId = data.result.holderId;
      console.log('Yippeee',this.planDetails);
      console.log('Wowza',data.result.competencyId);
      this.fetchProfile();
      this.fetchCompetencies();
    }
  }

  fetchCompetencies(){
    this.commonService.getCompetency().subscribe(data => {
      if(!data.hasError){
        this.allCompetencies = data.result;
        let counter = data.totalRecord;
        for(let i=0; i< counter; i++){
          // console.log(this.allCompetencies[i].id)
          if(this.allCompetencies[i].id =  this.competencyId) {
            this.roleCompetency = this.allCompetencies[i];
            console.log('Finally ooo', this.roleCompetency)
          }
          break;
        }
        console.log('Here is the competence',this.roleCompetency)
      }
    })

  }
}
