import { Page, TableMetadata } from './../model/metadata.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blog } from '../blog';

@Injectable({
  providedIn: 'root',
})
export class AdminService extends Blog {
  tables: TableMetadata[];
  constructor(private http: HttpClient) {
    super();
    this.tables = [];
  }

  //Get all the table names
  getBlog(metadata: string) {
    let apiEndPoint = this.apiEndPoint + metadata;
    this.addTokenInHeader();
    return this.http.get(apiEndPoint, { headers: this.headers });
  }

  //get all column details for the tables
  getMetadata(metadata: string) {
    let apiEndPoint = this.apiEndPoint + '/category' + '/metadata';
    this.addTokenInHeader();
    return this.http.get(apiEndPoint, { headers: this.headers });
  }

  //Get all the data for the table in pagignated way and sorted
  getDataList(metadata: string, page?: Page, column?: string, filter?: string) {
    let apiEndPoint = this.apiEndPoint + '/' + metadata;
    let params = this.getParamString(page, column);
    if (params) {
      apiEndPoint = apiEndPoint + params;
    }
    return this.http.get(apiEndPoint, { headers: this.headers });
  }

  //fetch one row based on id
  getData(metadata: string, data: any) {
    let apiEndPoint = this.apiEndPoint + '/' + metadata + '/' + data.id;
    return this.http.get(apiEndPoint, { headers: this.headers });
  }

  //add data
  addData(metadata: string, data: any) {
    let apiEndPoint = this.apiEndPoint + '/' + metadata;
    this.addTokenInHeader();
    return this.http.post(apiEndPoint, data, { headers: this.headers });
  }

  //update data
  updateData(metadata: string, data: any) {
    let apiEndPoint = this.apiEndPoint + '/' + metadata + '/' + data.id;
    this.addTokenInHeader();
    return this.http.put(apiEndPoint, data, { headers: this.headers });
  }

  //delete data
  deleteData(metadata: string, data: any) {
    let apiEndPoint = this.apiEndPoint + '/' + metadata + '/' + data.id;
    this.addTokenInHeader();
    return this.http.delete(apiEndPoint, { headers: this.headers });
  }
}
