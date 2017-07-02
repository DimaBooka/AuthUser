import { Component, OnInit } from '@angular/core';
import { UserService } from '../common-usage/services/user-service';
import { User } from '../common-usage/models/user.model';

@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit{
  title = 'apawdawdp';
  profile: User;
  editProfile: boolean = false;

  constructor(private userService: UserService){
  }

  ngOnInit() {
    this.profile = this.userService.getCurrentUser();
  }


}
