import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';
import {AccountService} from '../services/account/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private accountService: AccountService) { }

  username: string;
  email: string;
  phone: string;
  id: number;

  ngOnInit() {
    this.accountService.getInfo().subscribe( data => {
      this.username = data['userName'];
      this.email = data['email'];
      this.phone = data['phone'];
      this.id = data['id'];
      console.log(data);
    });
  }

  onSignOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}


