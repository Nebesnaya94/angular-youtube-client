import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IUser {
  name: string;
  password: string;
}

@Injectable()
export class AuthService {
  private loggedIn: boolean;
  private user: IUser;
  private savedUser: string | null;

  userName$: BehaviorSubject<string> = new BehaviorSubject('Your Name');

  getUser() {
    this.savedUser = localStorage.getItem('user');
    if (this.savedUser) {
      this.user = JSON.parse(this.savedUser);
      this.userName$.next(this.user.name);
    }
    this.loggedIn = !!this.user;
    return this.user;
  }

  login(name: string, password: string) {
    this.user = { name, password };
    localStorage.setItem('user', JSON.stringify(this.user));
    this.loggedIn = true;
    this.userName$.next(name);
  }

  logout() {
    localStorage.removeItem('user');
    this.loggedIn = false;
    this.userName$.next('Your Name');
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
