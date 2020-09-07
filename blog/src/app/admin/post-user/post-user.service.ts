import { map } from 'rxjs/operators';
import { PostUser } from './post-user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostUserService {
  apiEndPoint: string = 'http://localhost:8080/api';
  constructor(private http: HttpClient) {}

  login(postUser: PostUser) {
    let apiEndPoint = this.apiEndPoint + '/login';
    return this.http
      .post(apiEndPoint, postUser)
      .pipe(map((response: any) => new PostUser(response)));
  }
}
