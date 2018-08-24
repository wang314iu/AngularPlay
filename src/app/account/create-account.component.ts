import { Component, OnInit } from '@angular/core';
import { UserAccount } from '../shared/models/userAccount';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  userAccount: UserAccount = {
    email: '',
    dateofbirth: null,
    firstName: '',
    lastName: '',
    password: '',
    userName: ''
  };

  constructor() { }

  ngOnInit() {
  }

  // saveUser(userAccount: UserAccount) {
  //   console.log(userAccount);
  // }
  saveUser(accountForm: NgForm) {
    console.log(accountForm.value);
    console.log(accountForm.valid);
    console.log(accountForm);
  }

  get diagnostic() { return JSON.stringify(this.userAccount); }

}
