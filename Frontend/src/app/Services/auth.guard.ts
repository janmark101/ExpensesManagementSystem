import { CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';


import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class  authGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.authService.getUserFromLocalStorage();

    if (!user) {
      this.router.navigate(['']); 
      return false;
    }
    return true;
  }
}