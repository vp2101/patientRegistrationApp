import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.userExists()) {
      return true; // Allow access
    } else {
      this.router.navigate(['/login']); // Redirect to login
      return false; // Deny access
    }
  }
}
