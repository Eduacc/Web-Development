import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RequestOptions, Headers} from '@angular/http';

@Injectable()
export class ApiService {
  readonly ServerAddress = 'http://localhost:62271';
  constructor(private http: HttpClient) {
  }

  owin(url, body) {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Access-Control-Allow-Origin', '*')
    };
    return this.http.post(this.ServerAddress + url, body.toString(), options);
  }

  post(url, body) {
    return this.http.post(this.ServerAddress + url, body);
  }
}
