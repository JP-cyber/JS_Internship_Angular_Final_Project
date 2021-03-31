import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MyValidators } from '../my.validators';
import { User } from '../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;
  message: string;

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) =>{
      if(params['loginAgain']){
        this.message = `Your current session has expired. Please login
        again to continue using this app!`;
      }
    });

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
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.auth.login(user).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/']);
    });
  }

}
