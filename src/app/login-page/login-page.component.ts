import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyValidators } from '../my.validators';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        MyValidators.emailValidation
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        MyValidators.passwordValidation
      ])
    });
  }

  submit() {
    console.log(this.form.value);
  }

}
