import { LoanRequestDTO, AddUpdateLoanTypeServiceProxy, UpdateLoanRequestServiceProxy } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-loan-request',
  templateUrl: './loan-request.component.html',
  styleUrls: ['./loan-request.component.scss']
})
export class LoanRequestComponent implements OnInit {

  myHeader: string = 'You have no Loan Request';
  myDescription: string = 'Click to make a loan request';
  button: string = 'Click to request';
  pageNo: number = 1;

  loanModel: LoanRequestDTO = new LoanRequestDTO;

  selectedCase: string = 'request';
  selectedPanel: any = { title: 'request', label: 'Loan Request', status: 'Active'};
  requestChecklist = [
    { title: 'request', label: 'Loan Request', status: 'Active' },
    { title: 'documents', label: 'Related Documents', status: 'Inactive' },
    { title: 'guarantor', label: 'Guarantor List', status: 'Inactive' }
  ];


  constructor(private loanService: UpdateLoanRequestServiceProxy, private loan: AddUpdateLoanTypeServiceProxy) { }

  ngOnInit(): void {
  }

  selectPanel(rolelist, i) {
    this.selectedPanel = rolelist;

    this.requestChecklist.forEach(value => {
      value.status = 'Inactive';
    });
    this.requestChecklist[i].status = 'Active';
    this.selectedCase = this.requestChecklist[i].title;

  }

  gotoNext(){
    this.pageNo = 2;
  }

  uploadFile(){

  }

  addGuarantor(){

  }

  async makeLoanRequest(){
  //  const data = await this.loanService.updateLoanRequest(this.loanModel).toPromise();
  // const data = await this.loan.addUpdateLoanType(this.loanModel).toPromise();
  }

  getAllLoans(){

  }

}
