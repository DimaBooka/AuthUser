import { Component, OnInit } from '@angular/core';
import { AuthService } from '../common-usage/services/auth.service';
import { logInUser, User} from '../common-usage/models/user.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validationMessages } from '../common-usage/validation-messages';
import { UserService } from '../common-usage/services/user-service';

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

  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder,
              private userService: UserService) {}

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
        this.userService.setToken(resp['token']);
        this.authService.getUser().subscribe(
          user => {
            user = user['user'];
            let currentUser = new User(
              user['token'], user['name'],
              user['surName'], user['dob'],
              user['phone'], user['adress'],
              user['city'], user['country'],
              user['username'], user['password'],
              user['employmentStatus'],
              user['employmentPlace'],
              user['annualIncome'],
              user['favouriteSport']
            );
            this.userService.setCurrentUser(currentUser);
            this.userService.authorized();
            return this.router.navigate(['profile']);
          },
          error => this.serverError = error);
      },
      error => this.serverError = error);
  }
}
