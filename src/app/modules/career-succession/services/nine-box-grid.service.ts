import { Injectable } from '@angular/core';
import { ListResult } from 'app/_services/base-api.service';
import { createSubscription } from './base';
import { MyEmployeeDatail } from './employees.service';


export enum NINE_BOX_GRID {
  RoughDiamond,
  FutureStar,
  ConsistentStar,
  InconsistentPlayer,
  KeyPlayer,
  CurrentStar,
  TalentRisk,
  SolidProfessional,
  HighProfessional,
}

@Injectable({
  providedIn: 'root'
})
export class NineBoxGridService {

  constructor() { }

  fetchSummary() {
    const data = [];
    data[NINE_BOX_GRID.RoughDiamond] = 10;
    data[NINE_BOX_GRID.FutureStar] = 10;
    data[NINE_BOX_GRID.ConsistentStar] = 10;
    data[NINE_BOX_GRID.InconsistentPlayer] = 10;
    data[NINE_BOX_GRID.KeyPlayer] = 10;
    data[NINE_BOX_GRID.CurrentStar] = 10;
    data[NINE_BOX_GRID.TalentRisk] = 10;
    data[NINE_BOX_GRID.SolidProfessional] = 10;
    data[NINE_BOX_GRID.HighProfessional] = 10;
    return createSubscription(data);
  }

  fetchEmployee(id: number) {
    const data: ListResult<MyEmployeeDatail> = {
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(_id => new MyEmployeeDatail({}).fake(_id)),
      length: 10
    };
    return createSubscription(data);
  }
}
