import { map } from 'rxjs/operators';
import { User } from '../model/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostUserService {
  apiEndPoint: string = 'https://alloymobile.azurewebsites.net/blog/api';
  constructor(private http: HttpClient) {}

  login(postUser: User) {
    let apiEndPoint = this.apiEndPoint + '/login';
    return this.http
      .post(apiEndPoint, postUser)
      .pipe(map((response: any) => new User(response)));
  }
}
