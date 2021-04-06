import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyValidators } from '../my.validators';

@Component({
  selector: 'app-new-user-page',
  templateUrl: './new-user-page.component.html',
  styleUrls: ['./new-user-page.component.scss']
})
export class NewUserPageComponent implements OnInit {

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
      ]),
      userName: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        MyValidators.userNameValidation
      ])
    });
  }

  submit() {
    console.log(this.form.value);
  }

}
