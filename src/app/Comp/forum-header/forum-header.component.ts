import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService, LoginRequest, LoginResponse, RegisterResponse } from '../../services/auth.service';
import { catchError, Observable } from 'rxjs';
import { UserDto } from '../../models/user.model';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-forum-header',
  templateUrl: './forum-header.component.html',
  styleUrls: ['./forum-header.component.css'],
  imports: [CommonModule, FormsModule, RouterLink, RouterModule]
})
export class ForumHeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  user$ = this.authService.currentUser;
  loginValue = '';
  passwordValue = '';
  error = '';
  isSubmitted = false;


  constructor() { }

  onLoginClick(form: NgForm): void {
    this.isSubmitted = true;
    if (form.invalid) {
      setTimeout(() => {
        this.isSubmitted = false;
      }, 2000)
      return;
    }
    const loginData: LoginRequest = {
      username: this.loginValue,
      password: this.passwordValue
    }
    this.authService.login(loginData).subscribe({
      next: (response: LoginResponse) => {
        console.log("Success");
        this.isSubmitted = false;
        form.reset();
        form.resetForm();
        this.router.navigate(['/']);
      },
      error: (response) => {
        this.error = response.error;
        setTimeout(() => {
          this.error = '';
          form.reset();
          form.resetForm();
        }, 2000);
      }
    });
  }

  onRegisterClick(): void {
    this.router.navigate(['/register'])
  }
  onLogoutClick(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  isLoggedIn(): Boolean {
    return this.authService.isLoggedIn();
  }
  get username(): string {
    return this.authService.getusername();
  }
}
