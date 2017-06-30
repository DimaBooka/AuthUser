import { Component } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.scss']
})
export class HeaderComponent {

  constructor(private location: Location) {
  }

  detectRegister () {
    return this.location.path() === '/sign-up';
  }
}
