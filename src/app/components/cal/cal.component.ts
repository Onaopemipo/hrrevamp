import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { DeleteEventsServiceProxy } from '../../_services/service-proxies'
import { NbPopoverComponent, NbPopoverDirective } from '@nebular/theme';
enum DAYS {
  MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
}

const allDays = [
  DAYS.MONDAY, DAYS.TUESDAY, DAYS.WEDNESDAY, DAYS.THURSDAY, DAYS.FRIDAY, DAYS.SATURDAY, DAYS.SUNDAY
]
const weekDays = [
  DAYS.MONDAY, DAYS.TUESDAY, DAYS.WEDNESDAY, DAYS.THURSDAY, DAYS.FRIDAY,
]
export interface ICalendarEvent {
  start: Date;
  end?: Date;
  title?: string;
  description?: string;
  id: number;
  days?: DAYS[];
  skip_weekends?: boolean;
  type?: string;
  allday?: boolean;
}
export class CalendarEvent {
  start: Date;
  end: Date;
  title: string;
  description: string;
  id: number;
  days: DAYS[];
  type: string;

  static getDayEnd(date: Date) {
    date.setHours(23);
    date.setMinutes(59);
    return date;
  }

  constructor(obj: ICalendarEvent) {
    this.start = obj.start
    this.end = obj.allday ? CalendarEvent.getDayEnd(obj.start) : obj.end;
    this.days = obj.skip_weekends ? weekDays : allDays;
    this.title = obj.title;
    this.id = obj.id;
    this.description = obj.description;
    this.type = obj.type;
  }
}

class MyCalendarEvent extends CalendarEvent {
  dateString?: string;
}

const availableDays = {};
class MyDay {
  hasEvent = false;
  isToday = false;
  private constructor(date: Date) {
    this.date = date;
    this.isToday = date.toDateString() === new Date().toDateString();
  }
  static availableDays = new Map<string, MyDay>();
  static create(date: Date) {
    let newDate = MyDay.availableDays.get(date.toDateString());
    if (!newDate) {
      newDate = new MyDay(date);
      MyDay.availableDays.set(date.toDateString(), newDate);
    }
    return newDate;
  }
  static setEventToDate(date: Date, event: CalendarEvent) {
    const myDate = MyDay.create(date);
    myDate.setEvent(event);
  }
  events = [];
  date: Date;

  setEvent(event: CalendarEvent) {
    this.events.push(event);
    this.hasEvent = true;
  }

  getMonth() {
    return this.date.getMonth();
  }

  getDate() {
    return this.date.getDate()
  }

}

@Component({
  selector: 'ngx-cal',
  templateUrl: './cal.component.html',
  styleUrls: ['./cal.component.scss']
})
export class CalComponent implements AfterViewInit {

  @Input() year = 2020;
  @Input() month = 1;
  @Input() day = 1;
  weeks: MyDay[][] = [];

  days = [
    { name: 'SUN', val: 0 },
    { name: 'MON', val: 1 },
    { name: 'TUE', val: 2 },
    { name: 'WED', val: 3 },
    { name: 'THU', val: 4 },
    { name: 'FRI', val: 5 },
    { name: 'SAT', val: 6 },
  ];

  dates = [];
  @ViewChild('calendar') calendar: ElementRef;
  @ViewChild(NbPopoverDirective) popOver: NbPopoverDirective;
  constructor(private DeleteEventsServiceProxy: DeleteEventsServiceProxy) { }

  get monthLabel() {
    const months = [
      'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUNE', 'JULY', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
    ];
    //
    return months[this.month];
  }
  today = new Date();
  selectedDay?: MyDay;

  gotoThisMonth() {
    const today = new Date();
    this.month = today.getMonth();
    this.year = today.getFullYear();
    this.loadCalendar();
  }

  nextMonth() {
    if (this.month === 11) {
      this.year += 1;
      this.month = 0;
    } else {
      this.month += 1;
    }
    this.loadCalendar();
  }

  prevMonth() {
    if (this.month === 0) {
      this.year -= 1;
      this.month = 11;
    } else {
      this.month -= 1;
    }
    this.loadCalendar();
  }

  loadCalendar() {
    const dates = [];
    const firstDayOfMonth = new Date();
    firstDayOfMonth.setDate(1);
    firstDayOfMonth.setMonth(this.month);
    firstDayOfMonth.setFullYear(this.year);
    const dayNo = firstDayOfMonth.getDay();
    const firstDayOfCalendar = Number(firstDayOfMonth) - dayNo * 24 * 60 * 60 * 1000;
    this.weeks = [0, 1, 2, 3, 4, 5].map(week_no => this.days.map(day => {
      return MyDay.create(new Date(Number(firstDayOfCalendar) + (week_no * 7 + day.val) * 24 * 60 * 60 * 1000));
    }));
  }

  ngAfterViewInit(): void {
    this.gotoThisMonth()
  }

  @Output() dateClick = new EventEmitter<any>();
  dateClicked(day: MyDay) {
    this.selectedDay = day;
    this.popOver.show
    this.dateClick.emit(day);
    
    
  }

  day_events: Map<Date, CalendarEvent[]> = new Map<Date, CalendarEvent[]>();
  _events: CalendarEvent[] = [];
  @Input() set calendarEvents(events: CalendarEvent[]) {
    this._events = events;
    // const newEvents = this._events.map(event => {
    //   const newEvent = new MyCalendarEvent(event);
    //   newEvent.dateString = new Date(event.start.getFullYear(), event.start.getMonth(), event.start.getDate()).toUTCString();
    //   return newEvent;
    // })
    events.forEach(event => {
      MyDay.setEventToDate(event.start, event);
    })
    console.log(this._events)
    console.log(MyDay.availableDays)
  }

  // setSelectedDay(day: MyDay) {
  //   this.selectedDay = day;
  // }
  async deleteEvent(id) {
    alert(id)
    alert('are you sure you want to delete this event')

    const res = await this.DeleteEventsServiceProxy.deleteEvents(id).toPromise();
    this.selectedDay.events.filter(delEvent =>
      delEvent.id = !id)
    console.log('delete', res)
  }
}
