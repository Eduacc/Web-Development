import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable()
export class AuthService {

  constructor(private api: ApiService) { }

  login(loginData: { username: string, password: string }) {
    return this.api.owin('/oauth/token', loginData).map((data) => {
      localStorage.setItem('access_token', data['access_token']);
      return true;
    }, (error) => {
      console.log(error);
    });
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get isAuthorized(): boolean {
    return localStorage.getItem('access_token') !== null;
  }

  get accessToken() {
    return localStorage.getItem('access_token');
  }

}
