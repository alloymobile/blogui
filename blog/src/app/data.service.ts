import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  tableBody: any;
  tableHead: any;
  constructor() {
    this.tableBody = [
      {
        id: 1,
        name: 'science',
      },
      {
        id: 2,
        name: 'Math',
      },
      {
        id: 3,
        name: 'English',
      },
      {
        id: 4,
        name: 'Computer',
      },
      {
        id: 5,
        name: 'Drawing',
      },
    ];
    if (this.tableBody && this.tableBody.length > 0) {
      this.tableHead = this.tableBody[0];
    } else {
      this.tableHead = {};
    }
  }
}
