import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blog } from '../blog';

@Injectable({
  providedIn: 'root',
})
export class AdminService extends Blog {
  constructor(private http: HttpClient) {
    super();
  }

  getBlog(metadata: string) {
    let apiEndPoint = this.apiEndPoint + metadata;
    this.addTokenInHeader();
    return this.http.get(apiEndPoint, { headers: this.headers });
  }

  getDataList(metadata: string) {
    let apiEndPoint = this.apiEndPoint + '/' + metadata;
    return this.http.get(apiEndPoint, { headers: this.headers });
  }

  getData(metadata: string, data: any) {
    let apiEndPoint = this.apiEndPoint + '/' + metadata + '/' + data.id;
    return this.http.get(apiEndPoint, { headers: this.headers });
  }

  addData(metadata: string, data: any) {
    let apiEndPoint = this.apiEndPoint + '/' + metadata;
    this.addTokenInHeader();
    return this.http.post(apiEndPoint, data, { headers: this.headers });
  }

  updateData(metadata: string, data: any) {
    let apiEndPoint = this.apiEndPoint + '/' + metadata + '/' + data.id;
    this.addTokenInHeader();
    return this.http.put(apiEndPoint, data, { headers: this.headers });
  }

  deleteData(metadata: string, data: any) {
    let apiEndPoint = this.apiEndPoint + '/' + metadata + '/' + data.id;
    this.addTokenInHeader();
    return this.http.delete(apiEndPoint, { headers: this.headers });
  }

  getMetadata(metadata: string) {
    let apiEndPoint = this.apiEndPoint + '/category' + '/metadata';
    this.addTokenInHeader();
    return this.http.get(apiEndPoint, { headers: this.headers });
  }
}
