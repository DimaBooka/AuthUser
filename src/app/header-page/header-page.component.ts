import { OnInit, Component } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../common-usage/services/user-service';
import { AuthService } from '../common-usage/services/auth.service';
import { User } from '../common-usage/models/user.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.scss']
})
export class HeaderComponent implements OnInit{

  showAuthButtons: boolean = true;
  authSubscription: Subscription;

  constructor(
    private location: Location,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
    this.authSubscription = this.userService.getAuthorized().subscribe(trigger => {
      this.showAuthButtons = !trigger;
    });
  }

  ngOnInit() {
    let token = localStorage.getItem('token');
    if (token) {
      this.userService.setToken(token);
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
        },
        error => console.log(error));
    }
  }

  detectRegister() {
    return this.location.path() === '/sign-up';
  }

  doLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
