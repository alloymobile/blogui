import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Client } from '../model/client.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  user: BehaviorSubject<Client>;

  link: BehaviorSubject<string>;

  constructor() {
    this.user = new BehaviorSubject(new Client());
    this.link = new BehaviorSubject("");
  }

  nextUser(user: Client) {
    this.user.next(user);
  }

  nextLink(link: string) {
    this.link.next(link);
  }
}
