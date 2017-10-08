import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {UsernameValidators} from "../common/validators/username.validators";
import {AccountService} from "../services/account/account.service";

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
      // UsernameValidators.shouldBeUnique
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

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
  }

  signUp(credentials) {
    this.accountService.createUser(credentials);
  }

}
