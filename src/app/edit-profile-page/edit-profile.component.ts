import { Component, OnInit } from '@angular/core';
import { User, UserUpdate } from '../common-usage/models/user.model';
import { ActivatedRoute } from '@angular/router';
import {
  MinLengthValidator, MaxLengthValidator, ageValidator,
  MinLengthPhoneValidator, symbolsValidator, placeRequiredValidator, employedRequiredValidator,
  placeRequiredProfileValidator
} from '../common-usage/validators';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { IMyDpOptions } from 'mydatepicker';
import { validationMessages } from '../common-usage/validation-messages';
import { AuthService } from '../common-usage/services/auth.service';
import { UserService } from '../common-usage/services/user-service';


@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit{
  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'mm/dd/yyyy',
    showTodayBtn: false,
    editableDateField: false,
    openSelectorOnInputClick: true,
    disableUntil: {year: 1900, month: 1, day: 1}
  };
  public mask = ['+', '3', '8', '(', '0', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];

  validationMessages = validationMessages;
  profile: User;
  updateData: UserUpdate;
  profileForm: FormGroup;
  maxDate: any = new Date().toISOString().substring(0,10);
  showPlaceField: boolean = false;
  editProfile: boolean = true;
  serverError: string = '';

  constructor(private authService: AuthService,
              private userService: UserService,
              private route: ActivatedRoute,
              private fb: FormBuilder){
    this.route.data.subscribe((user: any)=> {
      this.profile = user['profile']['user'];
    });
  }

  ngOnInit() {
    this.profileForm = this.fb.group(this.initForm());
  }

  initForm() {
    return {
      name: [this.profile['name'], [Validators.required, MinLengthValidator(2), MaxLengthValidator(15)]],
      surName: [this.profile['surName'], [Validators.required, MinLengthValidator(2), MaxLengthValidator(20)]],
      dob: [this.profile['dob'], [Validators.required, ageValidator]],
      phone: [this.profile['phone'], [Validators.required, MinLengthPhoneValidator(17)]],
      adress: [this.profile['adress'], [Validators.required]],
      city: [this.profile['city'], [Validators.required]],
      country: [this.profile['country'], [Validators.required]],
      username: [this.profile['username'], [Validators.required, MinLengthValidator(2), MaxLengthValidator(15)]],
      password: [this.profile['password'], [Validators.required, symbolsValidator, MinLengthValidator(6)]],
      employmentStatus: [this.profile['employmentStatus'], [Validators.required, placeRequiredProfileValidator('employmentPlace', this.profile.employmentPlace)]],
      employmentPlace: [this.profile['employmentPlace'], [employedRequiredValidator('employmentStatus')]],
      annualIncome: [this.profile['annualIncome'], [Validators.required]],
      favouriteSport: [this.profile['favouriteSport'], []],
    }
  }

  toggleForm() {
    this.editProfile = !this.editProfile;
    this.profileForm = this.fb.group(this.initForm());
  }

  checkStatusValue(e) {
    this.showPlaceField = e.target.value == 'employed';
  }

  updateProfile() {
    if (this.profileForm.get('employmentPlace').value === 'default' ||
      this.profileForm.get('employmentStatus').value !== "Employed") {
      this.profileForm.get('employmentPlace').setValue('');
    }

    this.updateData = new UserUpdate(
      this.profileForm.get('name').value,
      this.profileForm.get('surName').value,
      this.profileForm.get('dob').value,
      this.profileForm.get('phone').value,
      this.profileForm.get('adress').value,
      this.profileForm.get('city').value,
      this.profileForm.get('country').value,
      this.profileForm.get('username').value,
      this.profileForm.get('password').value,
      this.profileForm.get('employmentStatus').value,
      this.profileForm.get('employmentPlace').value,
      this.profileForm.get('annualIncome').value,
      this.profileForm.get('favouriteSport').value
    );
    this.authService.updateUserInfo(this.updateData).subscribe(data => {
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
          this.profile = currentUser;
          this.userService.authorized();
          return this.toggleForm();
        },
        error => this.serverError = error);
    },
    error => this.serverError = error
    );
  }

}
