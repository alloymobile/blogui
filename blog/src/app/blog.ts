import { Page, ColumnMetadata } from './model/metadata.model';
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
} from '@fortawesome/free-solid-svg-icons';

export class Blog {
  headers: HttpHeaders;
  apiEndPoint: string = 'http://localhost:8080/blog/api';
  metadata: string = '/metadata';
  searchIcon = faSearch;
  cross = faTimes;
  //To change toggel arrow
  downToggle = faCaretDown;
  upToggle = faCaretUp;
  toggle: boolean = false;
  //Page data
  page: Page;

  //Modal Icons
  add = faPlusSquare;
  update = faEdit;
  delete = faTrashAlt;

  constructor() {
    this.page = new Page();
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

  getParamString(page?: Page, column?: ColumnMetadata): string {
    let param: string = '';
    if (page && column) {
      param =
        '?page=' +
        page.pageNumber +
        '&size=' +
        page.pageSize +
        '&sort=' +
        this.getSort(column);
    } else if (page) {
      param = '?page=' + page.pageNumber + '&size=' + page.pageSize;
    }
    return param;
  }

  getSort(column: ColumnMetadata): string {
    if (column.sortOrder) {
      return column.name + ',desc';
    } else {
      return column.name + ',asc';
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
    Object.keys(columns).forEach((key) => {
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
}
