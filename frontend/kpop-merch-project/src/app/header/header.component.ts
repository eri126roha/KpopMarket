import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private authService: AuthenticationService,
    private cookieService: CookieService,
    private router: Router // Inject Router here
  ) {}

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    const token = this.cookieService.get('token'); // Get token from cookie
    return token ? this.authService.isTokenValid(token) : false; // Pass token here
  }

  // Get the current user
  getCurrentUser(): any {
    return this.authService.getCurrentUser();
  }
  
  // Log out the user
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}


