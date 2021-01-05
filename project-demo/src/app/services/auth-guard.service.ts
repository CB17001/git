import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log(route);

    let authInfo = {
      authenticated: false
    };

    if (!authInfo.authenticated) {
      this.router.navigate(["login"]);
      return false;
    }

    return true;
  }
}
