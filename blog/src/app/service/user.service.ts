import { Blog } from './../blog';
import { map } from 'rxjs/operators';
import { User } from '../model/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostUserService extends Blog {
  constructor(private http: HttpClient) {
    super();
  }

  login(postUser: User) {
    let apiEndPoint = this.apiEndPoint + '/login';
    return this.http
      .post(apiEndPoint, postUser)
      .pipe(map((response: any) => new User(response)));
  }
}
