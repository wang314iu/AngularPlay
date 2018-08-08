import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router, CanActivate, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthenticationGuardService implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router) {

  }

  canActivate(route, state: RouterStateSnapshot) {
    if (this.authenticationService.isAdmin) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
