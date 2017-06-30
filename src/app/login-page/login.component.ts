import { Component, OnInit } from '@angular/core';
import { AuthService } from '../common-usage/services/auth.service';
import { logInUser } from '../common-usage/models/user.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validationMessages } from '../common-usage/validation-messages';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  validationMessages = validationMessages;
  loginForm: FormGroup;
  serverError: string;
  logInUser: logInUser;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  doLogin() {
    this.logInUser = new logInUser(
      this.loginForm.get('username').value,
      this.loginForm.get('password').value,
    );
    this.authService.login(this.logInUser).subscribe(
      resp => {
        console.log(resp);
        debugger;
        return this.router.navigate(['/login']);
      },
      error => console.log(error));
  }
}
