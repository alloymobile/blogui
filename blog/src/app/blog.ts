import { Page } from './model/metadata.model';
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

  addTokenInHeader() {
    if (localStorage.getItem('user')) {
      let user = JSON.parse(localStorage.getItem('user'));
      this.headers = new HttpHeaders().set(
        'Authorization',
        'Bearer ' + user.token
      );
    }
  }

  getParamString(page?: Page, column?: string): string {
    let param: string = '';
    if (page && column) {
      param =
        '?page=' +
        page.pageNumber +
        '&size=' +
        page.pageSize +
        '&sort=' +
        this.getSort(column, page.sort.direction);
    } else if (page && !column) {
      param = '?page=' + page.pageNumber + '&size=' + page.pageSize;
    }
    return param;
  }

  getSort(column: string, sort: boolean): string {
    if (sort) {
      return column + ',desc';
    } else {
      return column + ',asc';
    }
  }
}
