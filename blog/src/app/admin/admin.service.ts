import { Page, TableMetadata, SortColumn } from './../model/metadata.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blog } from '../blog';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminService extends Blog {
  tables: TableMetadata[];
  constructor(private http: HttpClient, private router: Router) {
    super();
    this.tables = [];
  }

  //Get all the table names
  getBlog(metadata: string) {
    let apiEndPoint = this.apiEndPoint + metadata;
    if (this.checkJwtToken()) {
      this.router.navigate(['/login']);
    } else {
      this.addTokenInHeader();
      return this.http.get(apiEndPoint, { headers: this.headers });
    }
  }

  //get all column details for the tables
  getMetadata(metadata: string) {
    let apiEndPoint = this.apiEndPoint + '/' + metadata + '/metadata';
    if (this.checkJwtToken()) {
      this.router.navigate(['/login']);
    } else {
      this.addTokenInHeader();
      return this.http.get(apiEndPoint, { headers: this.headers });
    }
  }

  //Get all the data for the table in pagignated way and searched
  getSearchDataList(
    metadata: string,
    page?: Page,
    filter?: string,
    columns?: any
  ) {
    let apiEndPoint = this.apiEndPoint + '/' + metadata;
    let params = this.getSearchParamString(page, filter, columns);
    if (params) {
      apiEndPoint = apiEndPoint + params;
    }
    if (this.checkJwtToken()) {
      this.router.navigate(['/login']);
    } else {
      this.addTokenInHeader();
      return this.http.get(apiEndPoint, { headers: this.headers });
    }
  }

  //Get all the data for the table in pagignated way and sorted
  getDataList(metadata: string, page?: Page, sortColumn?: SortColumn) {
    let apiEndPoint = this.apiEndPoint + '/' + metadata;
    let params = this.getParamString(page, sortColumn);
    if (params) {
      apiEndPoint = apiEndPoint + params;
    }
    if (this.checkJwtToken()) {
      this.router.navigate(['/login']);
    } else {
      this.addTokenInHeader();
      return this.http.get(apiEndPoint, { headers: this.headers });
    }
  }

  //fetch one row based on id
  getData(metadata: string, data: any) {
    let apiEndPoint = this.apiEndPoint + '/' + metadata + '/' + data.id;
    if (this.checkJwtToken()) {
      this.router.navigate(['/login']);
    } else {
      this.addTokenInHeader();
      return this.http.get(apiEndPoint, { headers: this.headers });
    }
  }

  //add data
  addData(metadata: string, data: any, formData?: FormData) {
    let apiEndPoint = this.apiEndPoint + '/' + metadata;
    if (this.checkJwtToken()) {
      this.router.navigate(['/login']);
    } else {
      this.addTokenInHeader();
      if (formData) {
        return this.http.post(apiEndPoint, formData, { headers: this.headers });
      } else {
        return this.http.post(apiEndPoint, data, { headers: this.headers });
      }
    }
  }

  //update data
  updateData(metadata: string, data: any, formData?: FormData) {
    let apiEndPoint = this.apiEndPoint + '/' + metadata + '/' + data.id;
    if (this.checkJwtToken()) {
      this.router.navigate(['/login']);
    } else {
      this.addTokenInHeader();
      if (formData.get('image') != null) {
        return this.http.put(apiEndPoint, formData, { headers: this.headers });
      } else {
        return this.http.put(apiEndPoint, data, { headers: this.headers });
      }
    }
  }

  //delete data
  deleteData(metadata: string, data: any) {
    let apiEndPoint = this.apiEndPoint + '/' + metadata + '/' + data.id;
    if (this.checkJwtToken()) {
      this.router.navigate(['/login']);
    } else {
      this.addTokenInHeader();
      return this.http.delete(apiEndPoint, { headers: this.headers });
    }
  }
}
