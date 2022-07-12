import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, take, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('The Auth guard');
    const access = localStorage.getItem('access');
    if (access) {
      this.authService.getUser().subscribe({
        next: (data) => {
          return true;
        },
        error: (err) => {
          console.log(err);
          return this.router.createUrlTree(['/login']);
        },
      });
      return true;
    } else return this.router.createUrlTree(['/login']);
  }
}
