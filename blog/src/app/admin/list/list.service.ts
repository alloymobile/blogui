import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  headers: HttpHeaders;
  apiEndPoint: string = 'http://localhost:8080/api';
  category: string = 'category';
  constructor(private http: HttpClient) {}

  getListData() {
    let apiEndPoint = this.apiEndPoint + '/' + this.category;
    return this.http.get(apiEndPoint, { headers: this.headers });
  }

  addData(data: any) {
    let apiEndPoint = this.apiEndPoint + '/' + this.category;
    this.addTokenInHeader();
    return this.http.post(apiEndPoint, data, { headers: this.headers });
  }

  updateData(data: any) {
    let apiEndPoint = this.apiEndPoint + '/' + this.category + '/' + data.id;
    this.addTokenInHeader();
    return this.http.put(apiEndPoint, data, { headers: this.headers });
  }

  deleteData(data: any) {
    let apiEndPoint = this.apiEndPoint + '/' + this.category + '/' + data.id;
    this.addTokenInHeader();
    return this.http.delete(apiEndPoint, { headers: this.headers });
  }

  getMetadata() {
    let apiEndPoint = this.apiEndPoint + '/metadata';
    this.addTokenInHeader();
    return this.http.get(apiEndPoint, { headers: this.headers });
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
}
