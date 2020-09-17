import { HttpClient } from '@angular/common/http';
import { Page, SortColumn } from './../model/metadata.model';
import { Blog } from './../blog';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeService extends Blog {
  constructor(private http: HttpClient) {
    super();
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
    return this.http.get(apiEndPoint, { headers: this.headers });
  }

  //Get all the data for the table in pagignated way and sorted
  getDataList(metadata: string, page?: Page, sortColumn?: SortColumn) {
    let apiEndPoint = this.apiEndPoint + '/' + metadata;
    let params = this.getParamString(page, sortColumn);
    if (params) {
      apiEndPoint = apiEndPoint + params;
    }
    return this.http.get(apiEndPoint, { headers: this.headers });
  }
}
