import { AlertserviceService } from './../../../../_services/alertservice.service';
import { EmployeeDTO } from 'app/_services/service-proxies';
import { MyKeyResultArea } from './../../services/key-result-area.service';
import { filter } from 'rxjs/operators';
import { PerformanceManagementService, MyPerformanceCycle } from './../../services/performance-management.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KeyResultAreaService } from '../../services/key-result-area.service';

interface IKRAReviewer{
  kraName: string;
  kraId: number;
  reviewerId: number;
  reviewerName: string;
  KraReviewerId: number;
  // reviewerId: number
};

@Component({
  selector: 'ngx-assign-kra',
  templateUrl: './assign-kra.component.html',
  styleUrls: ['./assign-kra.component.scss']
})
export class AssignKraComponent implements OnInit {
  master_search_clear_flag = 0;
  reviewer = [];
  employees = [];
  selected_kras: IKRAReviewer[] = [];
  selected_cylce = 0;
  cycles: MyPerformanceCycle[] = []
  kras: MyKeyResultArea[] = [];
  loadingSave = false;
  get unselected_kras(): MyKeyResultArea[] {
    return this.kras.filter(kra => !this.selected_kras.find(_kra => kra.id == _kra.kraId))
  }
  get_new_kra_data() {
    const new_kra_data: IKRAReviewer = {
      kraName: 'string',
      kraId: 0,
      reviewerId: 0,
      reviewerName: '',
      KraReviewerId: 0,
    }
    return new_kra_data;
  }
  editing_kra_data = this.get_new_kra_data();
  emptykra: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private kraService: KeyResultAreaService,
    private cycleService: PerformanceManagementService,
    private alertService: AlertserviceService,
  ) { }


  addKra() {
    console.log(this.kras, this.editing_kra_data)
    if (this.editing_kra_data.kraId) {
      this.emptykra = false;
      this.editing_kra_data.kraName = this.kras.find(kra => kra.id == this.editing_kra_data.kraId).section_name;
      this.selected_kras.push(this.editing_kra_data);
      this.editing_kra_data = this.get_new_kra_data();
      this.master_search_clear_flag += 1;
    } else {
      this.emptykra = true;
    }

  }
  deleteKra(f_kra){
    this.selected_kras = this.selected_kras.filter(kra => kra.kraId !== f_kra.kraId)
  }
  async ngOnInit() {
    (async () => {this.kras = (await this.kraService.list({pageNo: 1} ).toPromise()).data})();
    const filter: any = {};
    (async () => {this.cycles = (await this.cycleService.list(filter).toPromise()).data})();
    // this.activatedRoute.paramMap.subscribe(async (data) => {
    //   this.kra_id = Number(data.get('id'));
    //   this.kra = await this.kraService.fetch(this.kra_id).toPromise();
    // });
  }

  async assignKra() {
    this.loadingSave = true;
    const res = await this.kraService.assignObj(this.selected_cylce, JSON.stringify(this.selected_kras), this.employees.join(',')).toPromise();
    this.loadingSave = false;
    await this.alertService.openModalAlert(res.hasError ? this.alertService.ALERT_TYPES.FAILED : this.alertService.ALERT_TYPES.SUCCESS, res.message, 'Okay').toPromise();
 
    if(!res.hasError){
      this.master_search_clear_flag += 1;
    }
    this.loadingSave = false;
  }
  reviewerSelected(employees: EmployeeDTO[]){
    const reviewer = employees[0];
    this.editing_kra_data.reviewerId = reviewer.employeeContractId;
    this.editing_kra_data.reviewerName = reviewer.fullName;
  }

  employeesSelected(employees: EmployeeDTO[]){
    this.employees = employees.map(employee => employee.employeeContractId)
  }
}
