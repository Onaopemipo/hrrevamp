import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Calendar} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
// import  timeGridPlugin  from '@fullcalendar/timegrid'
import  listGridPlugin  from '@fullcalendar/list';
class MySring {
  a: String;

  constructor(a: string) {
    this.a = a;
  }
}

@Component({
  selector: 'ngx-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss', ]
})
export class CalenderComponent implements AfterViewInit {
  @ViewChild('calendar') calendar: ElementRef;
  @Output() dateClick = new EventEmitter();
  constructor() { }

  ngAfterViewInit(): void {
    console.log(this);
    const $this = this;
    let calendarEl = this.calendar.nativeElement;
    let calendar = new Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      dateClick: function(info) {
        console.log(this);
        $this.dateClick.emit();
      }
    });
    calendar.render();
  }

}
