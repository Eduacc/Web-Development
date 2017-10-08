import {Injectable} from '@angular/core';
import {ApiService} from '../api/api.service';
import {RequestOptions} from '@angular/http';
import {Headers} from '@angular/http';


@Injectable()
export class AccountService {

  constructor(private api: ApiService) {
  }

  createUser(credentials) {
    this.api.post('/api/accounts/create', credentials).subscribe((data) => {
      console.log(data);
      this.login(data['username'], credentials['password']);
    }, (error) => {
      console.log(error);
    });
  }

  login(username: string, password: string) {

    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    body.set('grant_type', 'password');

    this.api.owin('/oauth/token', body).subscribe((data) => {
      localStorage.setItem('access_token', data['access_token']);
    }, (error) => {
      console.log(error);
    });
  }

  logout() {
    localStorage.removeItem('access_token');
  }



}
