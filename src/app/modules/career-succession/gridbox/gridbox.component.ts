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

  boxSelected(type: NINE_BOX_GRID) {
    this.router.navigate(['career-succession/gridbox/', type]);
  }

  constructor(
    private nineBoxGrid: NineBoxGridService,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.data = await this.nineBoxGrid.fetchSummary().toPromise();
  }

  getBoxCount(){

  }

}
