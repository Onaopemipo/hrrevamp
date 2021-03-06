import { Component, EventEmitter, OnInit, Output, Input, Directive, ViewChildren, QueryList, TemplateRef } from '@angular/core';
import { ColumnTypes, TableColumn, TableData, TableAction, TableActionEvent } from './models';


const NUMBER_OF_ITEMS_PER_PAGE = 10;

export enum ActionsType {
  multipleIconActionType = 2,
  buttonActionType = 1,
  none = 3
}


export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: any;
  direction: SortDirection;
}

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
// tslint:disable-next-line: directive-class-suffix
export class NgbdSortableHeader {
  @Input() sortable: any = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}

@Component({
  selector: 'ngx-tablecomponent',
  templateUrl: './tablecomponent.component.html',
  styleUrls: ['./tablecomponent.component.scss']
})
export class TablecomponentComponent implements OnInit {
  items = [
    { title: 'Profile' },
    { title: 'Logout' },
  ];
  @Input() loading = false;
  @Input() tableColum: TableColumn[] = [];
  @Input() userData: [] = [];
  @Input() showCheckBox = false;
  @Input() showActions = true;
  @Input() actions: TableAction[];
  // @Output() actionClicked = new EventEmitter<>();
  @Output() actionClick = new EventEmitter<TableActionEvent>();
  pageData = [];
  tableData = [];
  _currentPage = 1;
  paginatioShowingPages = [1, 2, 3, 4, 5, 6];
  get totalNoOfPages() {
    return Math.ceil(this.totalItems / 10);
  }
  @Input() totalItems = 1000;
  @Output() pageChange = new EventEmitter<number>();
  @Input() set currentPage(val: number) {
    this._currentPage = val;
    // TODO: Generate pagination items
    // if (this.totalNoOfPages < 3) {
    //   this.paginatioShowingPages = [0, 1, 2, 3, 4];
    // } else {}
    this.paginatioShowingPages = [1, 2, 3, 4, 5, 6];
  }
  get currentPage() {
    return this._currentPage;
  }
  COLUMN_TYPES = ColumnTypes;
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor() { }

  customActionClicked(col, data){
    this.actionClick.emit({
      name: col.name,
      data,
    })
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '' || column === '') {
      this.tableData = this.userData;
    } else {
      this.tableData = [...this.userData].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  ngOnInit(): void {
    this.tableData = this.userData;

    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }

  pageClicked(pageNo: number) {
    this.pageChange.emit(pageNo);
  }

}
