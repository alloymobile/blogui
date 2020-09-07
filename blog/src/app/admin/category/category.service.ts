import { DataService } from './../../service/data.service';
import { Category } from './category.model';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  headers: HttpHeaders;
  apiEndPoint: string = 'https://alloymobile.azurewebsites.net/api';
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

  createCategory() {}

  updateCategory() {}

  deleteCategory() {}
}
