import { ColumnMetadata } from '../model/metadata.model';
import { User, Login } from '../model/user.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  tableBody: any[];
  tableHead: ColumnMetadata[];
  user: User;
  loginUser: Login;
  constructor() {
    this.user = new User();
    this.loginUser = new Login();
    this.tableBody = [];
    this.tableHead = [];
  }
}
