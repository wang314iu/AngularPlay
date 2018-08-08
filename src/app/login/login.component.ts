import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user';
import { UserLogin } from '../shared/models/UserLogin';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin: boolean;
  returnUrl: string;
  user: User;
  userLogin: UserLogin = {
    username: '',
    password: ''
  };

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthenticationService) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    // this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl' || '/');
    // console.log(this.returnUrl);
  }

  login() {

    this.authService.login(this.userLogin)
      .subscribe((response) => {

        if (response) {
          this.router.navigateByUrl(this.returnUrl);
        } else {
          this.invalidLogin = true;

        }

      },
        (err: any) => this.invalidLogin = true);

  }
}
