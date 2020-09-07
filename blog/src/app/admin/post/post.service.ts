import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  headers: HttpHeaders;
  apiEndPoint: string = 'http://localhost:8080/api';
  constructor(private http: HttpClient, private data: DataService) {
    this.data.tableBody = [];
    this.data.tableHead = {};
  }

  getAllCategory() {
    if (localStorage.getItem('user')) {
      let user = JSON.parse(localStorage.getItem('user'));
      this.headers = new HttpHeaders().set(
        'Authorization',
        'Bearer ' + user.token
      );
    }
    let apiEndPoint = this.apiEndPoint + '/category';
    return this.http.get(apiEndPoint, { headers: this.headers });
  }
}
