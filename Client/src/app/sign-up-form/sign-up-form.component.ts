import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {UsernameValidators} from '../common/validators/username.validators';
import {AccountService} from '../services/account/account.service';
import {AuthService} from "../services/auth/auth.service";
import {Router} from "@angular/router";
import {showWarningOnce} from "tslint/lib/error";

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css'], encapsulation: ViewEncapsulation.Emulated
})
export class SignUpFormComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('\\w+'),
    ], [
      UsernameValidators.shouldBeUnique
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('\\w+@\\w+\\.\\w+')
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('(8|\\+7)-?(\\(\\d{3}\\)|\\d{3})-?\\d{3}-?\\d{2}-?\\d{2}')
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('(\\w*[A-Z]\\w*[a-z]\\w*|\\w*[a-z]\\w*[A-Z]\\w*)')
    ])
  });

  warningText: string;
  isWarningVisible: boolean;

  get username() {
    return this.form.get('username');
  }

  get email() {
    return this.form.get('email');
  }

  get phone() {
    return this.form.get('phone');
  }

  get password() {
    return this.form.get('password');
  }

  constructor(private accountService: AccountService, private authService: AuthService, private router: Router) {
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

  signUp(credentials) {
    this.accountService.createUser(credentials).subscribe(data => {
      this.authService.login({username: credentials['username'], password: credentials['password']})
        .subscribe(next => {
            this.router.navigate(['/profile']);
          },
          error => {
            this.router.navigate(['/login']);
          });
    }, error => {
     // "{"message":"The request is invalid.","modelState":{"":["Name Admin is already taken."]}}"
      const errorMessage = JSON.parse(error.error);
      console.log(errorMessage);

      this.showWarning(errorMessage.modelState[''][0]);
    });
  }

}
