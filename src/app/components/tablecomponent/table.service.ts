import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TableData } from './models';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  // pageObservable = new Subject<TableData>();
  constructor() {
  }
}
