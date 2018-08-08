import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../shared/models/user';
import { UserLogin } from '../shared/models/UserLogin';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user: User;

  constructor(private apiService: ApiService, private jwtHelper: JwtHelperService, private jwtService: JwtService) { }

  login(userLogin: UserLogin): Observable<boolean> {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    return this.apiService.create('/token', userLogin, options)
      .pipe(map(response => {
        if (response) {
          this.jwtService.saveToken(response);
          return true;
        }
        return false;
      }));
  }

  logout() {
    this.jwtService.destroyToken();
  }

  get currentUserFullName(): string {
    if (this.decodedToken() != null) {
      const decodedResponse = this.decodedToken();
      const username = decodedResponse.firstName + ' ' + decodedResponse.lastName;
      return username;
    }
  }

  get isAdmin() {
    if (this.decodedToken() != null) {
      const roles = this.decodedToken().role;
      return roles.includes('Admin');
    }
  }

  private decodedToken(): User {
    const token = this.jwtService.getToken();
    if (!token) {
      return null;
    }
    const decodedToken = this.jwtHelper.decodeToken(token);
    this.user = decodedToken;
    return this.user;
  }

  isLoggedIn() {

    // global function from jwt library that looks for local storage key with 'token' and retruns bool
    // below is the manual code
    if (this.jwtHelper.isTokenExpired(this.jwtService.getToken())) {
      return false;
    } else { return true; }

  }
}
