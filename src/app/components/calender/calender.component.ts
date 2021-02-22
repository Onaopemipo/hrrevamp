import { Component, OnInit } from '@angular/core';
import { Calendar} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
// import  timeGridPlugin  from '@fullcalendar/timegrid'
import  listGridPlugin  from '@fullcalendar/list';
@Component({
  selector: 'ngx-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
