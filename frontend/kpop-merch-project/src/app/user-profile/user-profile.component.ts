import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  user: any = {};

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.user = this.authService.getCurrentUser(); // Get current logged-in user from local storage
  }
}
