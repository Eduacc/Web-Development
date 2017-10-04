import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css'], encapsulation: ViewEncapsulation.Emulated
})
export class SignUpFormComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  get username(){
    return this.form.get('username');
  }
  get email(){
    return this.form.get('email');
  }
  get phone(){
    return this.form.get('phone');
  }
  get password(){
    return this.form.get('password');
  }

  constructor() {
  }

  ngOnInit() {
  }


}
