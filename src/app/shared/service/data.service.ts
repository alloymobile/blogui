import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Client } from '../model/client.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  user: BehaviorSubject<Client>;

  constructor() {
    this.user = new BehaviorSubject(new Client());
  }

  nextUser(user: Client) {
    this.user.next(user);
  }
}
