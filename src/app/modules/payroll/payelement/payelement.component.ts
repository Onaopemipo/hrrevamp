import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TableAction, TableActionEvent } from 'app/components/tablecomponent/models';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { AddUpdatePayElementServiceProxy, CommonServiceProxy, ElementCategoryDTO, ElementTypeDTO, FetchPayrollItemsServiceProxy, FetchPayTypesServiceProxy, GetAllPayElementsServiceProxy, GetEarningsServiceProxy, IDTextViewModel, ManagePayElementDTO, PayElementDTO, PaymentInstitution } from 'app/_services/service-proxies';


enum TOP_ACTIONS {
  ADD_PAYROLL_ELEMENT,

}
enum TABLE_ACTION {
  VIEW = '1',
  DELETE = '2',
  EDIT = '3'
}

@Component({
  selector: 'ngx-payelement',
  templateUrl: './payelement.component.html',
  styleUrls: ['./payelement.component.scss']
})
export class PayelementComponent implements OnInit {
  payElementForm: FormGroup;
  ManagePayElement = new ManagePayElementDTO().clone();
  loadingPayElement = false;
  allPayrollItems: IDTextViewModel[] = [];
  allPayTypes: IDTextViewModel[] = [];
  allElementType: ElementTypeDTO[] = [];
  allElementCategories: ElementCategoryDTO[] = [];
  allPaymentInstitution: PaymentInstitution[] = [];
  allPayElementDTO: PayElementDTO[] = [];
  topActionButtons = [
    {name: TOP_ACTIONS.ADD_PAYROLL_ELEMENT, label: 'Add Payroll Item', 'icon': 'plus', outline: false},

  ];

  tableColumns = [
    { name: 'a', title: 'NAME' },
    { name: 'b', title: 'PAYMENT TYPE' },
    { name: 'c', title: 'ELEMENT NAME' },
    { name: 'd', title: 'ELEMENT CATEGORY' },
    { name: 'e', title: 'ELEMENT TYPE' },
    { name: 'e', title: 'ELEMENT TYPE' },
    { name: 'f', title: 'AMOUNT' },
    { name: 'g', title: 'INSTITUTION' },
  ];

  tableActions: TableAction[] = [
    {name: TABLE_ACTION.VIEW, label: 'View'},
    {name: TABLE_ACTION.EDIT, label: 'Edit'},
    {name: TABLE_ACTION.DELETE, label: 'Delete'},
  ]
  data = [{}]
  showViewModal : boolean = false
  showdeleteModal = false;
  elementFilter = {
    pageSize: 10,
    pageNumber:1,
    payTypeId:  undefined,
    paymentInstitutionId: undefined,
    elementTypeId:  undefined,
    elementCategoryId:undefined
  }
  currentPage = 1;
  totalItems = 0;
  showAddElementModal = false;
  constructor(private router: Router,
    private FetchPayrollItemsService: FetchPayrollItemsServiceProxy,
    private FetchPayTypesService: FetchPayTypesServiceProxy,
    private CommonService: CommonServiceProxy,
    private GetAllPayElementsService: GetAllPayElementsServiceProxy,
    private AddUpdatePayElementService: AddUpdatePayElementServiceProxy,
    private alertservice: AlertserviceService,
  private GetEarningsService: GetEarningsServiceProxy) { }
  get showEmpty() {
    return this.allPayElementDTO.length === 0;
  }

 async getPaymentInstitution() {
    var payInst = await this.CommonService.getPaymentInstitutions().toPromise();
    if (!payInst.hasError) {
      this.allPaymentInstitution = payInst.result;
   }
  }
  async getPayElementType() {
    var elType = await this.CommonService.getElementTypes().toPromise();
    if (!elType.hasError) {
      this.allElementType = elType.result;
   }

  }
  async getPayElementCategory() {
    var elCat = await this.CommonService.getElementCategories().toPromise();
    if (!elCat.hasError) {
      this.allElementCategories = elCat.result;
    }
  }
 async getPayType() {
   var ptype = await this.FetchPayTypesService.getPayTypes().toPromise();
   if (!ptype.hasError) {
     this.allPayTypes = ptype.result;
   }
  }
  async getPayrollItem() {
    var data = await this.FetchPayrollItemsService.getPayrollItems().toPromise();
    if (!data.hasError) {
      this.allPayrollItems = data.result;
    }
  }
  
  async getAllPayElement() {
    this.loadingPayElement = true;
    var elType =await this.GetAllPayElementsService.getAllPayElements(this.elementFilter.pageSize,this.elementFilter.pageNumber,this.elementFilter.payTypeId,this.elementFilter.paymentInstitutionId,this.elementFilter.elementTypeId,this.elementFilter.elementCategoryId).toPromise();
    this.loadingPayElement = false;
    if (!elType.hasError) {
      this.allPayElementDTO = elType.result;
      this.totalItems = this.allPayElementDTO.length;
  }
  }
  ngOnInit(): void {
    this.getAllPayElement();
    this.getPayrollItem();
    this.getPayType();
    this.getPayElementCategory();
    this.getPayElementType();
    this.getPaymentInstitution();
    this.ManagePayElement.is_variable = false;
  }

  tableActionClicked(event: TableActionEvent){
    if(event.name==TABLE_ACTION.DELETE){
      this.showdeleteModal = true
      }
      if(event.name==TABLE_ACTION.EDIT){
        this.router.navigateByUrl('/payroll/editpayment')
      }
      if(event.name==TABLE_ACTION.VIEW){
        this.showViewModal = true
      }
  }


  modal(button) {
    if (button == 0) {
      this.showAddElementModal = true;
 }
  }

  createUpdatePayElement() {
    this.loadingPayElement = true;
    this.AddUpdatePayElementService.addUpdatePayElement(this.ManagePayElement).subscribe(data => {
      this.loadingPayElement = false;
      if (!data.hasError) {
        this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.SUCCESS, data.message, "OK");
        this.ManagePayElement = new ManagePayElementDTO().clone();
        this.getAllPayElement();
      } else {
        this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.FAILED, data.message, "OK");
      }
    });
  }
}
