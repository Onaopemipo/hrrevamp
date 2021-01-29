import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import IComplaintFactory from '../data/factories/complaint.factory'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  getComplaints(){
    return of(IComplaintFactory.buildList(10))
  }
}
