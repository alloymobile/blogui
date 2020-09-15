import { Page, ColumnMetadata, SortColumn } from './model/metadata.model';
import { HttpHeaders } from '@angular/common/http';
import {
  faSearch,
  faCaretUp,
  faCaretDown,
  faTimes,
  faPlus,
  faPlusSquare,
  faEdit,
  faTrashAlt,
  faPrint,
  faFileUpload,
  faFileDownload,
} from '@fortawesome/free-solid-svg-icons';

export class Blog {
  headers: HttpHeaders;
  apiEndPoint: string = 'http://localhost:8080/blog/api';
  metadata: string = '/metadata';
  tableName: string = '/table';
  searchIcon = faSearch;
  cross = faTimes;
  //To change toggel arrow
  downToggle = faCaretDown;
  upToggle = faCaretUp;
  toggle: boolean = false;
  //Page data
  page: Page;
  sortColumn: SortColumn;

  //Modal Icons
  add = faPlusSquare;
  update = faEdit;
  delete = faTrashAlt;
  print = faPrint;
  upload = faFileUpload;
  download = faFileDownload;

  constructor() {
    this.page = new Page();
    this.sortColumn = new SortColumn();
  }

  addTokenInHeader() {
    if (localStorage.getItem('user')) {
      let user = JSON.parse(localStorage.getItem('user'));
      this.headers = new HttpHeaders().set(
        'Authorization',
        'Bearer ' + user.token
      );
    }
  }

  getParamString(page?: Page, sortColumn?: SortColumn): string {
    let param: string = '';
    if (page && sortColumn) {
      param =
        '?page=' +
        page.pageNumber +
        '&size=' +
        page.pageSize +
        '&sort=' +
        this.getSort(sortColumn);
    } else if (page) {
      param = '?page=' + page.pageNumber + '&size=' + page.pageSize;
    }
    return param;
  }

  getSort(sortColumn: SortColumn): string {
    if (sortColumn.sort) {
      return sortColumn.name + ',desc';
    } else {
      return sortColumn.name + ',asc';
    }
  }
  getSearchParamString(
    page?: Page,
    filter?: String,
    columns?: ColumnMetadata[]
  ): string {
    let param: string = '';
    if (page && filter) {
      param =
        '?page=' +
        page.pageNumber +
        '&size=' +
        page.pageSize +
        this.getSearchString(filter, columns);
    } else if (page) {
      param = '?page=' + page.pageNumber + '&size=' + page.pageSize;
    }
    return param;
  }

  getSearchString(filter: any, columns: ColumnMetadata[]): string {
    let filterString = '';
    console.log(columns);
    Object.keys(columns).forEach((key: any) => {
      // console.log(value);
      // switch (value.type) {
      //   case 'number':
      //       if (!isNaN(filter)) {
      //         filterString = filterString + '&' + key + '=' + filter;
      //       }
      //     break;
      //   case 'text':
      //     if()
      //     break;
      //   case 'date':
      //     break;
      // }
      if (key.includes('id')) {
        if (!isNaN(filter)) {
          filterString = filterString + '&' + key + '=' + filter;
        }
      } else {
        if (isNaN(filter)) {
          filterString = filterString + '&' + key + '=' + filter;
        }
      }
    });
    return filterString;
  }

  capitalize(s) {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
}
