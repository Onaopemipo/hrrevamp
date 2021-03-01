import { Component, OnInit, ViewChild, Input, ElementRef, AfterViewInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { NbPopoverComponent, NbPopoverDirective } from '@nebular/theme';
import { MENU_ITEMS } from 'app/modules/pages-menu';
import { ModalformComponent } from '../modalform/modalform.component';
import { CalenderComponent } from 'app/components/calender/calender.component';
@Component({
  selector: 'ngx-employeeevents',
  templateUrl: './employeeevents.component.html',
  styleUrls: ['./employeeevents.component.scss']
})
export class EmployeeeventsComponent implements AfterViewInit {
  @ViewChild(CalenderComponent) calendar: CalenderComponent;
  @Input() Events: string = 'Events';
  menu = MENU_ITEMS;
  link = '/todo';
  @ViewChild(NbPopoverDirective) popOver: NbPopoverDirective;
  formcomponent = ModalformComponent;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,listWeek'
    },

    dayMaxEvents: true, // allow "more" link when too many events
    events: [
      { title: 'event 1', date: '2020-08-12' },
      { title: 'event 1', date: '2020-08-12' },
      { title: 'event 1', date: '2020-08-12' },
      { title: 'event 1', date: '2020-08-12' },
      { title: 'event 1', date: '2020-08-12' },
      { title: 'event 1', date: '2020-08-12' },
      { title: 'event 1', date: '2020-08-12' },
      { title: 'event 1', date: '2020-08-12' },
      { title: 'event 1', date: '2020-08-12' },
      { title: 'event 2', date: '2020-08-11' },
    ],
    dateClick: (date) => {
      this.popOver.show();
    }
  };

  constructor() { }

  ngOnInit(): void {
  }
 onClick() {
 }
 ngAfterViewInit(){
   console.log(this.calendar);
 }
 showPopover(){
   alert(666)
   console.log(this)
   this.popOver.show();
 }
}
