import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'ngx-cal',
  templateUrl: './cal.component.html',
  styleUrls: ['./cal.component.scss']
})
export class CalComponent implements AfterViewInit {

  @ViewChild('calendar') calendar: ElementRef;
  constructor() { }

  ngAfterViewInit(): void {
    let calendar = new Calendar(this.calendar.nativeElement, {});
    calendar.render();
  }

}
