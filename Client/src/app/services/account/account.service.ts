import {Injectable} from '@angular/core';
import {ApiService} from '../api/api.service';
import {AuthService} from "../auth/auth.service";


@Injectable()
export class AccountService {

  constructor(private api: ApiService, private auth: AuthService) {
  }

  createUser(credentials) {
    return this.api.post('/api/accounts/create', credentials);
  }

  getInfo() {
    return this.api.getAuth('/api/accounts/user');
  }

}
