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
  userLogin: UserLogin;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthenticationService) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    // this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl' || '/');
    console.log(this.returnUrl);
  }

  login() {

    this.authService.login(this.userLogin)
      .subscribe((response) => {

        if (response) {
          // this.token = response;
          //  this.router.navigate(['/']);
          // console.log(this.returnUrl);
          this.router.navigateByUrl(this.returnUrl);
          // console.log(response);
          // console.log(this.tokenResponse.access_token);
        }

        // tslint:disable-next-line:one-line
        else {
          this.invalidLogin = true;

        }

      },
        // (err: any) => console.log(err));
        (err: any) => this.invalidLogin = true);

    // console.table(this.credentials);
    // console.log(this.tokenResponse.access_token);
    // console.table(this.tokenResponse);
  }
}
