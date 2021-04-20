import { GetGridBoxCountServiceProxy, GridBoxCountDTO, GetEmployeeebyGridBoxServiceProxy, NineGridBoxDTO } from './../../../_services/service-proxies';
import { TableColumn } from 'app/components/tablecomponent/models';
import { Component, OnInit } from '@angular/core';
import { NineBoxGridService, NINE_BOX_GRID } from '../services/nine-box-grid.service';
import { Router } from '@angular/router';



// const nineBoxGridConfig = [
//   {
//     id: NINE_BOX_GRID.RoughDiamond,
//     name: 'Rough Diamond',
//     icon: 'far fa-star',
//     backgroundColor: '#FCD5B5',
//     color: 'black',
//     number: 0,
//   },
//   {
//     name: 'Future Star',
//     icon: 'far fa-star',
//     backgroundColor: '#FFA8A8',
//     color: 'white',
//     number: 0,
//   },
//   {
//     name: 'Consistent Star',
//     icon: 'far fa-star',
//     backgroundColor: '#27AE60',
//     color: 'white',
//     number: 0,
//   },
//   {
//     name: 'Inconsistent Player',
//     icon: 'fas fa-feather',
//     backgroundColor: '#E6E21A',
//     color: 'white',
//     number: 0,
//   },
// ];


// nineBoxGridConfig[NINE_BOX_GRID.RoughDiamond] = {
//   name: 'Rough Diamond',
//   icon: 'far fa-star',
//   backgroundColor: '#FCD5B5',
//   color: 'black',
//   number: 0,
// };

// nineBoxGridConfig[NINE_BOX_GRID.RoughDiamond] = {
//   name: 'Rough Diamond',
//   icon: 'far fa-star',
//   backgroundColor: '#FCD5B5',
//   color: 'black',
//   number: 0,
// };

// nineBoxGridConfig[NINE_BOX_GRID.RoughDiamond] = {
//   name: 'Rough Diamond',
//   icon: 'far fa-star',
//   backgroundColor: '#FCD5B5',
//   color: 'black',
//   number: 0,
// };

// nineBoxGridConfig[NINE_BOX_GRID.RoughDiamond] = {
//   name: 'Rough Diamond',
//   icon: 'far fa-star',
//   backgroundColor: '#FCD5B5',
//   color: 'black',
//   number: 0,
// };
@Component({
  selector: 'ngx-gridbox',
  templateUrl: './gridbox.component.html',
  styleUrls: ['./gridbox.component.scss']
})
export class GridboxComponent implements OnInit {
  appraisalTable: TableColumn [] = [
    {name: 'name', title: 'Name'},
    {name: 'id', title: 'ID'},
    {name: 'department', title: 'Department'},
    {name: 'unit', title: 'Unit'},
    {name: 'position', title: 'Position'}

  ];
  NINE_BOX_GRID = NINE_BOX_GRID;
  data = {};

  boxCount: GridBoxCountDTO []= [];
  employeeGrid: NineGridBoxDTO [] = [];

  boxSelected(type: NINE_BOX_GRID) {
    this.router.navigate(['career-succession/gridbox/', type]);
  }

  constructor(
    private nineBoxGrid: NineBoxGridService, private gridService: GetGridBoxCountServiceProxy,
    private router: Router, private gridBox: GetEmployeeebyGridBoxServiceProxy,
  ) { }

  async ngOnInit() {
    this.data = await this.nineBoxGrid.fetchSummary().toPromise();
  }

  async getBoxCount(){
    const data = await this.gridService.getGridBoxCount().toPromise();
    if(!data.hasError){
      this.boxCount = data.result;
      console.log('counterrr', this.boxCount)
    }
  }

  async getEmployeeGrid(){
    const data = await this.gridBox.getEmployeebyGridBox(1,0).toPromise();
    if(!data.hasError){
      this.employeeGrid = data.result;
      console.log('Employee Grid:', this.employeeGrid)
    }
  }

}
