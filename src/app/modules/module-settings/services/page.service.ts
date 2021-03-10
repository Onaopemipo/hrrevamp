import { Injectable } from '@angular/core';

class State<D, F, E>{
  filter: F;
  data: D[];
  editingData: E;
}

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor() { }
}
