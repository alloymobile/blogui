import { Page } from './model/metadata.model';
import { HttpHeaders } from '@angular/common/http';
export class Blog {
  headers: HttpHeaders;
  apiEndPoint: string = 'http://localhost:8080/blog/api';
  metadata: string = '/metadata';

  addTokenInHeader() {
    if (localStorage.getItem('user')) {
      let user = JSON.parse(localStorage.getItem('user'));
      this.headers = new HttpHeaders().set(
        'Authorization',
        'Bearer ' + user.token
      );
    }
  }

  getParamString(page: Page, sort: string): string {
    let param: string;
    if (page) {
      param = '?page=' + page.page + '&size=' + page.size;
    }
    return param;
  }
}
