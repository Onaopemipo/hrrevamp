import { Component, EventEmitter, OnInit, Output, Input, Directive, ViewChildren, QueryList, TemplateRef,ViewChild } from '@angular/core';
import { ColumnTypes, TableColumn, TableData, TableAction, TableActionEvent } from './models';
import { ExcelServiceService } from '../../_services/excel-service.service';
import { PdfServiceService } from '../../_services/pdf-service.service';
import { NbPopoverDirective } from '@nebular/theme';
const NUMBER_OF_ITEMS_PER_PAGE = 10;

export enum ActionsType {
  multipleIconActionType = 2,
  buttonActionType = 1,
  none = 3
}

export enum ACTIONS { EDIT = '1', DELETE = '2' }

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
  @Input() InputFileName = 'SmartaceFile';
  @Input() loading = false;
  @Input() tableColum: TableColumn[] = [];
  @Input() searchabletableColum: TableColumn[] = [];
  @Input() userData: any[] = [];
  @Input() showCheckBox = false;
  @Input() showActions = true;
  @Input() actions: TableAction[];
  @Input() Bulkactions: TableAction[];
  @Input() table2 = false;
  @Input() showFilter = false;
  @Input() showBulkAction: boolean = false;
  // @Output() actionClicked = new EventEmitter<>();
  @Output() actionClick = new EventEmitter<TableActionEvent>();
  @Output() actionChecked = new EventEmitter<TableActionEvent>();
  @Output() actionBulkChecked = new EventEmitter<TableActionEvent>();
  pageData = [];
  tableData = [];
  _currentPage = 1;
  pageSize = 10;
  paginatioShowingPages = [1, 2, 3, 4, 5, 6];
  get totalNoOfPages() {
    return Math.ceil(this.totalItems / 10);
  }
  @Input() totalItems = 1000;
  @Output() pageChange = new EventEmitter<number>();
  @Output() filterChange = new EventEmitter<object>();
  @Input() set currentPage(val: number) {
    this._currentPage = val;
    // TODO: Generate pagination items
    // if (this.totalNoOfPages < 3) {
    //   this.paginatioShowingPages = [0, 1, 2, 3, 4];
    // } else {}
    //this.paginatioShowingPages = [1, 2, 3, 4, 5, 6];
  }
  get currentPage() {
    return this._currentPage;
  }
  COLUMN_TYPES = ColumnTypes;
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  bulkAction_isChecked: boolean = false;
  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;
  constructor(private ExcelService: ExcelServiceService, private PdfService:PdfServiceService) { }
  test() {
    alert(112);
  }

  customActionClicked(col, data) {
    this.popover.hide();
    this.actionClick.emit({
      name: col.name,
      data,
    });
  }
  handleBulkChecked(event) {

    if (event) {
      this.userData.map(d => {
        d.is_selected = true;
        return d;
      })
    } else {
      this.userData.map(d => {
        d.is_selected = false;
        return d;
      })
    }
    this.bulkAction_isChecked = event != true ? false : true;
    var data = event;
    this.actionBulkChecked.emit({
      name: 'bulkChecked',
      data,
})

  }
  customActionChecked(colIndex, data) {
//console.log(this.userData)
    this.userData[colIndex]['is_selected'] = !this.userData[colIndex]['is_selected'];
 //console.log(this.userData[colIndex]);
    var serchPos = this.userData.findIndex(u => u.is_selected === true);
  //////  console.log('search Position',serchPos )
    this.bulkAction_isChecked = serchPos == -1 ? false : true;
   // console.log( this.bulkAction_isChecked)
    this.actionChecked.emit({
      name: colIndex,
      data,
    });
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
    console.log(this.userData)
    this.tableData = this.userData;

    // setTimeout(() => {
    //   this.loading = false;
    // }, 3000);
  }

  filter = {};
  pageClicked(pageNo: number) {
    this.pageChange.emit(pageNo);
    this.filter = {...this.filter, ...{page: pageNo, } };
    this.filterChange.emit(this.filter);
  }
  handleSearch(event) {
    if(event && (event != "" || event == null))
    {
      this.userData = this.tableData;
      var truchk = false;        
        this.userData = this.userData.filter(uf => {
          this.tableColum.some(sval => {
            if (uf[sval.name]) {
              // if(sval.type == this.COLUMN_TYPES.Text)
              // {
               // console.log(uf[sval.name], event.toString())
                if (uf[sval.name].toString().toLowerCase().indexOf(event.toString().toLowerCase()) > -1) { truchk = true; return true;}else{truchk = false;}
              //  }          
              // else {
              //   if (uf[sval.name] == event) { truchk = true; return true;}else{truchk = false;}
              // }
            }
        
          })     
          return truchk;
      })
      
    }else {
      this.userData = this.tableData;
    }
  }
  handleExportAs(event) {
    if (event == "Excel") {
      this.ExcelService.exportAsExcelFile(this.userData,this.InputFileName)
    }
    if (event == "pdf"  || event == "Print") {
      var theader = [];
      var tbody = [];

      this.userData.forEach((dval, dindex) => {
        var hobj = [];
        var tobj = [];
        this.tableColum.forEach((hval) => {
          hobj.push(hval.title)
          tobj.push(dval[hval.name])
        });
        theader.push(hobj);
        tbody.push(tobj)
      })
      if (event == "pdf") this.PdfService.downloadAsPDF(theader, tbody, this.InputFileName);
      if (event == "Print") this.PdfService.printAsPDF(theader, tbody, this.InputFileName);
    }
  }
  filterUpdated(filter){
    this.filter = {...filter, ...{page: this.currentPage, } };
    this.filterChange.emit(this.filter);
  }

}
