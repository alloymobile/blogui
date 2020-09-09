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
}
