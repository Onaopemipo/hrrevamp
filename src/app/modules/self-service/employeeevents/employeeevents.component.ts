import { Component, OnInit, ViewChild, Input, ElementRef, AfterViewInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { NbPopoverComponent, NbPopoverDirective } from '@nebular/theme';
import { MENU_ITEMS } from 'app/modules/pages-menu';
import { ModalformComponent } from '../modalform/modalform.component';
import { CalenderComponent } from 'app/components/calender/calender.component';
import { ManageEventDTO, AddUpdateEventsServiceProxy, GetAllEventsServiceProxy, EventDTOListApiResult, EventDTO } from '../../../_services/service-proxies'
import { AlertserviceService } from '../../../_services/alertservice.service'
import { TableAction, TableActionEvent } from 'app/components/tablecomponent/models';
import { FormGroup } from '@angular/forms';
import { date } from 'faker'
import {CalendarEvent} from '../../../../../src/app/components/cal/cal.component'

enum TOP_ACTIONS {
  ADD_Event,
  INITIATE_VOLUNTARY_EXIT
}

@Component({
  selector: 'ngx-employeeevents',
  templateUrl: './employeeevents.component.html',
  styleUrls: ['./employeeevents.component.scss']
})
export class EmployeeeventsComponent implements AfterViewInit {
  @ViewChild(CalenderComponent) calendar: CalenderComponent;
  @Input() Events: string = 'Events';
  submitbtnPressed: boolean = false;
  Event: ManageEventDTO = new ManageEventDTO().clone()
  EventForm: FormGroup;
  menu = MENU_ITEMS;
  link = '/todo';
  @ViewChild(NbPopoverDirective) popOver: NbPopoverDirective;
  formcomponent = ModalformComponent;
  showEmpty: boolean = false
  loading: boolean = false
  showEvent: boolean = false
  dat = new Date()
  EventList: EventDTO[]
  

  topActionButtons = [
    { name: TOP_ACTIONS.ADD_Event, label: 'Add Event', 'icon': 'plus', outline: false },

  ];
  // calendarOptions: CalendarOptions = {
  //   initialView: 'dayGridMonth',
  //   headerToolbar: {
  //     left: 'prev,next today',
  //     center: 'title',
  //     right: 'dayGridMonth,listWeek',
  //   },



    // dayMaxEvents: true, // allow "more" link when too many events
    // events: [
    //   {
    //     id: 'a',
    //     title: 'my event',
    //     start: '2018-09-01'
    //   }
    // ],

    // dateClick: (date) => {
    //   // this.showEvent = true;
    //   // i
    //   const eventData = this.AllEvents.filter(dayEvent => {
    //     if (dayEvent.startDate == date.date) {
    //       return true;

    //     }
    //     return false;
    //   })
    //   this.popOver.show();
    // }

  // };
  // async addEvent(event: ManageEventDTO) {
  //   const response = await this.AddUpdateEvent.addUpdateEvent(event).toPromise()
  //   console.log(response)

  // }
  constructor(private AddUpdateEvent: AddUpdateEventsServiceProxy, private getall: GetAllEventsServiceProxy,
    private alertservice: AlertserviceService) { }

  ngOnInit(): void {
    this.getallaEvent()
  }
  onClick() {
  }
  ngAfterViewInit() {
    console.log(this.calendar);
  }
  // showPopover() {
  //   alert(666);
  //   console.log(this);
  //   this.popOver.show();
  // }
  modal(event: any) {
    if (event == TOP_ACTIONS.ADD_Event) {
      this.showEvent = true
    }
  }

  PageSize: number = 10
  pageNumber: number = 10
  AllEvents: EventDTO[]
  async getallaEvent() {
    const response = await this.getall.getAllEvents(this.PageSize, this.pageNumber).toPromise()
    this.loading = false
    if (!response.hasError) {
      this.loading = true
      this.AllEvents = response.result
      console.log(response.result)
      // this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.SUCCESS, response.message, 'OK');
      const newEvent = this.AllEvents.map(myEvent => {
        return {
          id: myEvent.id,
          title: myEvent.title,
          start: myEvent.startDate,
          end:myEvent.endDate,
          description: myEvent.description
  
        }
      })
      this.calEvents == newEvent
    }

    (error) => {

      if (error.status == 400) {
        this.alertservice.openCatchErrorModal(this.alertservice.ALERT_TYPES.FAILED, error.title, "Ok", error.errors);
      }
    }
  }
  //events from calcomponent
  calEvents: CalendarEvent[]=[]

  get validatestartdate() {
    if (this.Event.startDate) return true;
    return false;
  }
  get validateenddate() {
    if (this.Event.endDate) return true;
    return false;
  }

  get disableEvent() {
    let resp: boolean = true;

    let nullable = [
      "eventTypeId",
      "id",
      "notify_Employee",
    ]

    Object.entries(this.Event).map(([key, value], index) => {
      if ((value == "" || value == null || value == undefined) && nullable.indexOf(key) == -1) {
        resp = false;
      }
      // if (key == 'account_no' && !this.accountNumberValidate) resp = false;
    });
    console.log(this.Event)
    return resp;
  }

  async SubmitEvent(Event: ManageEventDTO) {
    this.submitbtnPressed = true
    const response = await this.AddUpdateEvent.addUpdateEvent(Event).toPromise()
    if (!response.hasError) {
      this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.SUCCESS, response.message, 'OK');
      // console.log(response.result)
    }
    (error) => {

      if (error.status == 400) {
        this.alertservice.openCatchErrorModal(this.alertservice.ALERT_TYPES.FAILED, error.title, "Ok", error.errors);
      }
    }
    this.submitbtnPressed = false
  }
  today = new Date()
  Day = this.today.getDay()

  dateClick(day) {
    this.popOver.show();
    this.showEvent = true
    alert('hello')
  }
  
}
