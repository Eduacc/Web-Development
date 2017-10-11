import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css']
})
export class SignInFormComponent implements OnInit {

  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
    ])
  });
  isWarningVisible: boolean;
  warningText: string;
  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.hideWarning();
  }

  showWarning(text = null) {
    this.warningText = text;
    this.isWarningVisible = true;
  }

  hideWarning() {
    this.isWarningVisible = false;

  }

  signIn(credentials) {
    this.authService.login({username: credentials['username'], password: credentials['password']})
      .subscribe(data => {
        this.hideWarning();
        this.router.navigate(['/profile']);
      }, error => {
        const err = JSON.parse(error.error);
        this.showWarning(err.error_description);
      });
  }


  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }
}
