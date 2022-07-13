import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ReverseAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('The Reverse Auth guard');
    const access = localStorage.getItem('access');
    if (access) {
      this.authService.getUser().subscribe({
        next: (data) => {
          console.log(data);
          console.log('I am inside');
          return this.router.createUrlTree(['/']);
        },
        error: (err) => {
          console.log(err);
          return true;
        },
      });
      return this.router.createUrlTree(['/']);
    } else return true;
  }
}
