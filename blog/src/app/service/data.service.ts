import { PostUser, Login } from './../admin/post-user/post-user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  tableBody: any;
  tableHead: any;
  user: PostUser;
  loginUser: Login;
  constructor() {
    this.user = new PostUser();
    this.loginUser = new Login();
    this.tableBody = [
      {
        id: 1,
        name: 'science',
      },
      {
        id: 2,
        name: 'Math',
      },
    ];
    if (this.tableBody && this.tableBody.length > 0) {
      this.tableHead = this.tableBody[0];
    } else {
      this.tableHead = {};
    }
  }
}
