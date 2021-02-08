import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { NbPopoverComponent, NbPopoverDirective } from '@nebular/theme';
import { ModalformComponent } from '../modalform/modalform.component';
@Component({
  selector: 'ngx-employeeevents',
  templateUrl: './employeeevents.component.html',
  styleUrls: ['./employeeevents.component.scss']
})
export class EmployeeeventsComponent implements OnInit {
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
      date.dayEl.style.backgroundColor = 'green';
      this.popOver.show();
    }
  };

  constructor() { }

  ngOnInit(): void {
  }
 onClick() {
 }
}
