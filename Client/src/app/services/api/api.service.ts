import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RequestOptions, Headers} from '@angular/http';
import {AuthService} from "../auth/auth.service";

@Injectable()
export class ApiService {
  readonly ServerAddress = 'http://localhost:62271';
  constructor(private http: HttpClient) {
  }

  owin(url, loginData: { username: string, password: string }) {
    const body = new URLSearchParams();
    body.set('username', loginData.username);
    body.set('password', loginData.password);
    body.set('grant_type', 'password');
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Access-Control-Allow-Origin', '*')
    };
    return this.http.post(this.ServerAddress + url, body.toString(), options);
  }

  post(url, body) {
    return this.http.post(this.ServerAddress + url, body);
  }

  get(url) {
    return this.http.get(this.ServerAddress + url);
  }

  getAuth(url) {

    const options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
        .set('Access-Control-Allow-Origin', '*')
    };
    return this.http.get(this.ServerAddress + url, options);
  }
}
