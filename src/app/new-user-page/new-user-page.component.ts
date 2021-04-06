import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyValidators } from '../my.validators';
import { User } from '../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-new-user-page',
  templateUrl: './new-user-page.component.html',
  styleUrls: ['./new-user-page.component.scss']
})
export class NewUserPageComponent implements OnInit {

  form: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router
    ) { }

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

  submit(): void {
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
      userName: this.form.value.userName
    };

    this.auth.setUser(user).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/login']);
    });
  }

}
