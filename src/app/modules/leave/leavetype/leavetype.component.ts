import { DataServiceProxy, DeleteLeaveTypeServiceProxy, DropdownValue, GetLeaveTypesServiceProxy, LeaveTypeDTO, PostServiceProxy } from './../../../_services/service-proxies';
import { FormGroup } from '@angular/forms';
import { Component, OnInit , Input} from '@angular/core';

import { ColumnTypes, TableAction, TableActionEvent,ACTIONS } from 'app/components/tablecomponent/models';
import { AlertserviceService } from '../../../_services/alertservice.service'
import { IStatus, MyColor } from 'app/components/status/models';

export class LeaveTypeWithStatus extends LeaveTypeDTO implements IStatus {
  leaveType: LeaveTypeDTO;
  aloowedGenderName: string
  constructor(leaveType: LeaveTypeDTO) {
    super(leaveType);
    this.leaveType = leaveType;

  }
  get status() {
    return this.leaveType.isActive;
}
  getStatusLabel() {
    if (this.leaveType.isActive) return 'Active';
    if (!this.leaveType.isActive) return 'In-Active';
  

  }
  getStatusColor() {
    if (this.leaveType.isActive) return new MyColor(0, 153, 74);
    if (!this.leaveType.isActive) return new MyColor(253, 238, 238);
    return new MyColor(242, 0, 74);
 }
 }
enum TOP_ACTIONS {
  ADD_LEAVE_TYPE,

}

@Component({
  selector: 'ngx-leavetype',
  templateUrl: './leavetype.component.html',
  styleUrls: ['./leavetype.component.scss']
})

export class LeavetypeComponent implements OnInit {
  LeaveType: string = 'Leave Type';
  myForm: FormGroup;
  inputText: string = 'Attach';

  leaveTypeModel: LeaveTypeDTO = new LeaveTypeDTO().clone();

  topActionButtons = [
    {name: TOP_ACTIONS.ADD_LEAVE_TYPE, label: 'Add Leave Type', 'icon': 'plus', outline: false},

  ];


  tableColumns = [
    {name: 'name', title: 'Leave Type Name',type: ColumnTypes.Text},
    {name: 'isDeductableFromAnualLeave', title: 'Deductible From Annual Leave',type: ColumnTypes.Text},
    {name: 'aloowedGenderName', title: 'Allow Gender',type: ColumnTypes.Text},
    { name: 'maxDays', title: 'Max No Of Days',type: ColumnTypes.Text },
    {name: 'isActive', title: 'Status',type: ColumnTypes.Status},
  ];
  leaveTypeList = [];
  filter = {
    IsAnnualLeave: undefined,
    MaxDays: null,
    IsGradeDependent: undefined,
    MinDays: undefined,
    pageSize: 10,
    pageNumber: 1
  }
  loading: boolean = false;
  modificationStatus: boolean = false;
  totalItems = 0;
  currentPage = 1;
  tableActions: TableAction[] = [
    { name: ACTIONS.EDIT, label: 'Edit' },
    { name: ACTIONS.DELETE, label: 'Delete' },
  ];
  submitbtnPressed: boolean = false;
  genderValues: DropdownValue[] = [];
  constructor(private GetLeaveTypesService: GetLeaveTypesServiceProxy,
    private alertservice: AlertserviceService, private DeleteLeaveTypeService: DeleteLeaveTypeServiceProxy,
    private PostService:PostServiceProxy,private myDropdown: DataServiceProxy,) { }

  ngOnInit(): void {
    this.getGender();
    this.getLeaveTypes();
   
  }
  getGender(){
    this.myDropdown.getDropDownValuesById(12).subscribe(data => {
      if(!data.hasError){
         this.genderValues = data.result;
      }
      else {
        console.log('There was an error')
      }
    })
  }
  get getMinMax() {
  if (this.leaveTypeModel.minDays > this.leaveTypeModel.maxDays) return "Minimum Days cannot be greater than Maximum Days";
  return "";
  }
  get disableForm() {
    let resp: boolean = true;
    let nullable = [
      'id',
      'companyID',
      'subID',
      'isDeductableFromAnualLeave',
      'excludeWeekendInCalculation',
      'isOnlyAvailableToAdmin',
      'isAnnualLeave',
      'isSystemDefault',
      'isGradeDependent',
      'pro_rateLeaveDays',
      'onlyForConfirmStaff',
      'isActive',
      'isDeleted',
      'dateCreated',
      'createdById',
      'dateModified',
      'modifiedById',
    ]
 
    Object.entries(this.leaveTypeModel).map(([key, value], index) => {
      if ((value == "" || value == null || value == undefined) && nullable.indexOf(key) == -1) {
        resp = false;
      }
    });
    if (resp && this.getMinMax) resp = false;
    return resp;
  }
  modal(buttion) {
    if (buttion === TOP_ACTIONS.ADD_LEAVE_TYPE) {
     this.showLeaveTypeModal = true;

    }

  }
  get showEmpty() {
    return this.leaveTypeList.length === 0;
  }
  tableActionClicked(event: TableActionEvent) {
    if (event.name == "1") {
      this.leaveTypeModel = event.data;
      this.showLeaveTypeModal = true;
      this.modificationStatus = true;
    }
    if (event.name == "2") {
      this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.CONFIRM, event.data.name, 'Yes').subscribe(data => {
        if (data == "closed") {
          this.deleteleaveYear(event.data.id);
        }
  
      })
    }
     }
  filterUpdated(filter: any) {
    this.filter = {...this.filter, ...filter};
    this.getLeaveTypes();
  }
  deleteleaveYear(id) {
    this.DeleteLeaveTypeService.deleteLeaveType(id).subscribe(response => {
      if (!response.hasError) {
        this.getLeaveTypes();
        this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.SUCCESS, response.message, 'OK');
        this.leaveTypeModel = new LeaveTypeDTO().clone();
        this.modificationStatus = false;
      } else {
        this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.FAILED, response.message, 'OK')
      }

    }, (error) => {

      if (error.status == 400) {
        this.alertservice.openCatchErrorModal(this.alertservice.ALERT_TYPES.FAILED, error.title, "Ok", error.errors);
      }
    });
  
  }
  getLeaveTypes() {
    this.loading = true;
    this.GetLeaveTypesService.getLeaveTypes(this.filter.IsAnnualLeave, this.filter.MaxDays, this.filter.IsGradeDependent, this.filter.MinDays, this.filter.pageNumber, this.filter.pageSize)
      .subscribe(data => {
        this.loading = false;
        this.modificationStatus = false;
        if(!data.hasError)
        {
          var lvtype = data.result.map(lvtype => {
            let newlT = new LeaveTypeWithStatus(lvtype);
            newlT.aloowedGenderName = this.genderValues.find(x => x.option_value == newlT.allowedGender).option_text;
            return newlT
          });
         
          this.leaveTypeList = lvtype;
         
          this.totalItems = data.totalRecord;
         
        } else {
          
        }
      }, (error) => {
        console.log(error);
      })
}
  showLeaveTypeModal = false;

  createNewLeaveType() {
    this.submitbtnPressed = true;
    this.PostService.createLeaveType(this.leaveTypeModel).subscribe(data => {
      this.submitbtnPressed = false;
      if (!data.hasError) {
        this.getLeaveTypes();
        this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.SUCCESS, data.message, 'OK');
        this.leaveTypeModel = new LeaveTypeDTO().clone();
        this.showLeaveTypeModal = false;
        this.modificationStatus = false;
      }
      else {
        this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.FAILED, data.message, 'OK')
      }
    }, (error) => {
      this.submitbtnPressed = false;
      if (error.status == 400) {
        this.alertservice.openCatchErrorModal(this.alertservice.ALERT_TYPES.FAILED, error.title, "Ok", error.errors);
      }
    })
  }
}
