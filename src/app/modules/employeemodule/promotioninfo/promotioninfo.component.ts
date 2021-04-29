import { CommonServiceProxy, DataServiceProxy, Position } from 'app/_services/service-proxies';
import { AlertserviceService } from './../../../_services/alertservice.service';
import { FetchEmployeeByIdServiceProxy, EmployeeDTO, Sp_FetchEligibleEmployees, FetchEmployeeContractByEmployeeIdServiceProxy, EmployeeContractAssignmentDTO } from './../../../_services/service-proxies';
import { EmployeesService } from './../../career-succession/services/employees.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-promotioninfo',
  templateUrl: './promotioninfo.component.html',
  styleUrls: ['./promotioninfo.component.scss']
})
export class PromotioninfoComponent implements OnInit {

  tableColumns = [
    { name: '', title: ' Qualification Name' },
    { name: '', title: 'Qualification Type' },
    { name: '', title: 'Course Name' },
    { name: '', title: 'Institution' },
    { name: '', title: 'Start Date' },
    { name: '', title: 'End Date' },
  ];

  selectedCase: string = 'personal_Info';
  selectedPanel: any = { title: 'personal_Info', label: 'Personal Information', status: 'Active' };
  employeeviewlist = [
    { title: 'personal_Info', label: 'Personal Information', status: 'Active', iconname: 'person' },
    { title: 'promotion_info', label: 'Promotion Information', status: 'Inactive' , iconname: 'volume-down'},

  ];

  employeeDetails: EmployeeDTO = new EmployeeDTO().clone();
  contractDetails: EmployeeContractAssignmentDTO = new EmployeeContractAssignmentDTO;

  newPromotion = new Sp_FetchEligibleEmployees().clone();
  allPositions: Position[] = [];
  departmentName: string = '';
  totalItems = 0;
  currentPage = 1;
  jobName = '';
  constructor(private employeeService: FetchEmployeeByIdServiceProxy, private activatedroute: ActivatedRoute,
    private router: Router,private CommonService: CommonServiceProxy,
    private alert: AlertserviceService,
    private contract: FetchEmployeeContractByEmployeeIdServiceProxy,
    private dataService: DataServiceProxy,
  ) { }


  selectPanel(hiringlist, i) {
    this.selectedPanel = hiringlist;

    this.employeeviewlist.forEach(value => {
      value.status = 'Inactive';
    });
    this.employeeviewlist[i].status = 'Active';
    this.selectedCase = this.employeeviewlist[i].title;
  }
  getPositions() {
    this.CommonService.getPositions().subscribe(data => {
      if (!data.hasError) {
        this.allPositions = data.result;
      }else{}
      
    })
  }
  getPositionName(position_id) {
    let ptitle = "";
    if(this.allPositions.length > 0){
      ptitle = this.allPositions.find(x => x.id == position_id).title;
    }
    return ptitle;
  }
  getEmployeebyId(employeeId) {
    this.employeeService.getEmployeeById(employeeId).subscribe((data) => {
      if (!data.hasError) {
        this.employeeDetails = data.result;
        this.jobName = this.employeeDetails.contracts.length > 0 ? this.employeeDetails.contracts[0].jobName : "";
        this.departmentName = this.employeeDetails.contracts.length > 0 ? this.employeeDetails.contracts[0].departmentName : "";
        this.totalItems = this.employeeDetails.qualifications.length;   
          }
    });
    }
  ngOnInit(): void {
    this.employeeDetails.contracts = [];
    this.employeeDetails.addresses = [];
    this.employeeDetails.qualifications = [];
    this.activatedroute.queryParams.subscribe(data => {
      if (data.data) {
        this.newPromotion = JSON.parse(data.data);
        console.log(this.newPromotion);
        this.getEmployeebyId(this.newPromotion.employee_id)
 
      }else {
        this.router.navigate(['/employeemodule/promotion']);
  }
    }
    );

  }
  get   showEmptyQualifications(){
    return this.employeeDetails.qualifications.length === 0;
  }


}
