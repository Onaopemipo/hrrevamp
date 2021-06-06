import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FetchPayslipsServiceProxy,FetchPayslipItemsServiceProxy, PayrollRun, IDTextViewModel, CommonServiceProxy, PayslipItem } from 'app/_services/service-proxies';

enum TOP_ACTIONS {
  ADDPAYELEMENT,
  ADD_PLAN

}


interface Fields {
  id?: number,
  name?: string
}

@Component({
  selector: 'ngx-analysistestpay',
  templateUrl: './analysistestpay.component.html',
  styleUrls: ['./analysistestpay.component.scss']
})
export class AnalysistestpayComponent implements OnInit {
  pageName = "Payroll Details";
  payElement: Fields[] = []
  ElementList = []
  showAddModal: boolean = false
  showEditModal: boolean = false
  selectedOption = ''
  topActionButtons = [
    { name: TOP_ACTIONS.ADDPAYELEMENT, label: 'Add Pay Element', 'icon': 'plus', outline: true },

  ];
  payRunId = 0;
  payRunName = "";
  PayrollRun = new PayrollRun().clone();
  allpayPeriod: IDTextViewModel[] = [];
  payslipItem: PayslipItem[] = [];
  constructor(    private router: Router,
    private activatedroute: ActivatedRoute,
    private FetchPayslipsService : FetchPayslipsServiceProxy,
    private FetchPayslipItemsService: FetchPayslipItemsServiceProxy,
    private commoService: CommonServiceProxy) { }
  getPeriodName(id) {
    var pName = "";
    if (this.allpayPeriod.length > 0) {
      var dedpchk = this.allpayPeriod.find(x => x.id == id);
      if (dedpchk) {
        pName = dedpchk.text
      }
    }
    return pName;
  }
    async getpayPeriod() {
      var data = await this.commoService.getPayPeriods().toPromise();
      if (!data.hasError) {
        this.allpayPeriod = data.result;
      }
    }
  getPaySlips() {
    this.FetchPayslipsService.fetchPayslips(this.payRunId, 0).subscribe(slipdata => {
      if (!slipdata.hasError) {
        if (slipdata.result.length > 0) {
          slipdata.result.forEach(val => {
            this.FetchPayslipItemsService.fetchPayslipItems(val.id).subscribe(data => {
              if (!data.hasError) {
                if (this.payslipItem.length > 0) {
                  data.result.forEach(pval => {
                    var ddp = this.payslipItem.findIndex(x => x.elementInputId == pval.elementInputId);
                    if (ddp != -1) {
                      this.payslipItem[ddp].outputVal += pval.outputVal;
                    } else {
                      this.payslipItem.push(pval);
                    }
                   });
                 
                } else {
                  data.result.forEach(pval => {
                    this.payslipItem.push(pval);
                  })
                }
              }
            })
          })
        }
      }
    })
  }
  goback() {
    this.router.navigate(['/payroll/runlog'])
  }
  ngOnInit(): void {
    console.log("am here");
    this.getpayPeriod();
    this.activatedroute.queryParams.subscribe(async data => {
      console.log(data)
      if (data.id && data.payrun) {
        this.payRunId = data.id;
        this.PayrollRun = JSON.parse(data.payrun);
        this.getPaySlips();
      }
      if (data.name) {
        this.payRunName = data.name;
        this.pageName += " - " + this.payRunName;
      }
    })
  }

  
  modal(event) {
    if (event == TOP_ACTIONS.ADDPAYELEMENT) {
      this.showAddModal = true
    }
  }

  selectionChanged(ev: any) {
    const val = ev.target.value;

    let firstresult = '';
    //i want to check if any selected input is present in the elementList array
    //receving the checked ones
    firstresult = this.ElementList.find(x => x.name == val);
    if (firstresult) {
      alert('selected input already exit')
    }


    //if there is no element found that is equal to the value passed in the existing arrays then
    if (!firstresult) {

      let selectedElement = {
        name: val
      }
      this.ElementList.push(selectedElement)
    }

  }
  onDelete(list) {
    this.ElementList = this.ElementList.filter(Eli => {
      Eli.id !== list.id
    })
  }

  showModal() {
    this.showEditModal = true
  }

}
